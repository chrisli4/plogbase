import uuid from 'uuid';
import { Firebase } from '../lib/firebase';

class FirebaseHelper {
  constructor() {
    // Firebase SDK.
    this.database = Firebase.database();
    this.storage = Firebase.storage();
    this.auth = Firebase.auth();

    this.POSTS_PAGE_SIZE = 3;
  }

  /**
   * Uploads a new Picture to Cloud Storage and returns a download URL.
   */
  async uploadImageAsync(uri, imageURI) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', imageURI, true);
      xhr.send(null);
    });

    const ref = Firebase.storage()
      .ref(uri)
      .child(uuid());
    const snapshot = await ref.put(blob);

    blob.close();

    return snapshot.ref.getDownloadURL();
  }

  /**
   * Uploads a new post to the global and user feed and returns the post's key.
   */
  uploadPost(uri, imageURI, post) {
    const newPostKey = Firebase.database()
      .ref()
      .push().key;
    const postData = {
      ...post,
      id: newPostKey,
      uri: imageURI,
      time: Date.now(),
    };

    const updates = {};
    updates[`/posts/${newPostKey}`] = postData;
    updates[
      `/people/${this.auth.currentUser.uid}/posts/${newPostKey}`
    ] = postData;
    return this.database
      .ref()
      .update(updates)
      .then(() => newPostKey);
  }

  /**
   * Paginates posts from the global post feed.
   *
   * Fetches a page of `PAGE_POSTS_PAGE_SIZE` posts from the user's posts feed.
   *
   * We return a `Promise` which resolves with an Map of posts or
   * `null` if there is no next page.
   */
  getPosts(earliestEntryId) {
    return this._getPaginatedFeed(
      `/posts`,
      FirebaseHelper.POSTS_PAGE_SIZE,
      earliestEntryId,
      true
    );
  }

  /**
   * Paginates posts from the user's posts feed.
   *
   * Fetches a page of `PAGE_POSTS_PAGE_SIZE` posts from the user's posts feed.
   *
   * We return a `Promise` which resolves with an Map of posts or
   * `null` if there is no next page.
   */
  getUserPosts(uid, earliestEntryId) {
    return this._getPaginatedFeed(
      `/people/${uid}/posts`,
      FirebaseHelper.POSTS_PAGE_SIZE,
      earliestEntryId,
      true
    );
  }

  /**
   * Paginates entries from the given feed.
   *
   * Fetches a page of `pageSize` entries from the given feed.
   *
   * If provided we'll return entries that were posted before (and including) `earliestEntryId`.
   *
   * We return a `Promise` which resolves with an Map of entries or
   * `null` if there is no next page.
   *
   * If needed the posts details can be fetched. This is useful for shallow post feeds like the user
   * home feed and the user post feed.
   */
  getPaginatedFeed(
    uri,
    pageSize,
    earliestEntryId = null,
    fetchPostDetails = false
  ) {
    let ref = this.database.ref(uri);
    if (earliestEntryId) {
      ref = ref.orderByKey().endAt(earliestEntryId);
    }
    return ref
      .limitToLast(pageSize)
      .once('value')
      .then(data => {
        const entries = data.val() || {};
        const entryIds = Object.keys(entries);

        if (fetchPostDetails) {
          const queries = entryIds.map(postId => this.getPostData(postId));
          return Promise.all(queries).then(results => {
            const deleteOps = [];
            results.forEach(result => {
              if (result.val()) {
                entries[result.key] = result.val();
              } else {
                // We encountered a deleted post. Removing permanently from the feed.
                delete entries[result.key];
                deleteOps.push(this.deleteFromFeed(uri, result.key));
              }
            });
            if (deleteOps.length > 0) {
              // We had to remove some deleted posts from the feed. Lets run the query again to get
              // the correct number of posts.
              return this._getPaginatedFeed(
                uri,
                pageSize,
                earliestEntryId,
                fetchPostDetails
              );
            }
            return entries;
          });
        }
        return entries;
      });
  }

  /**
   * Fetches a single post data.
   */
  getPostData(postId) {
    return this.database.ref(`/posts/${postId}`).once('value');
  }

  /**
   * Deletes the given post from the global post feed and the user's post feed. Also deletes
   * comments, likes and the file on Cloud Storage.
   */
  deletePost(postId) {
    const updates = {};
    updates[`/posts/${postId}`] = null;
    updates[`/people/${this.auth.currentUser.uid}/posts/${postId}`] = null;
    return this.database.ref().update(updates);
  }

  /**
   * Updates the given feeds with the update object.
   */
  updateFeed(updates) {
    return this.database.ref().update(updates);
  }

  /**
   * Generates a new push key locally.
   */
  genKey() {
    return this.database.ref().push().key;
  }
}

export default new FirebaseHelper();
