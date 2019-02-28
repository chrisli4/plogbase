import { Firebase } from '../lib/firebase';
import latinize from 'latinize';

class FirebaseHelper {
  /**
   * Number of posts loaded initially and per page for the feeds.
   * @return {number}
   */
  static get POSTS_PAGE_SIZE() {
    return 3;
  }

  /**
   * Number of posts loaded initially and per page for the User Profile page.
   * @return {number}
   */
  static get USER_PAGE_POSTS_PAGE_SIZE() {
    return 6;
  }

  constructor() {
    // Firebase SDK.
    this.database = Firebase.database();
    this.storage = Firebase.storage();
    this.auth = Firebase.auth();

    // Firebase references that are listened to.
    this.firebaseRefs = [];
  }

  /**
   * Subscribes to receive updates to the general posts feed. The given `callback` function gets
   * called for each new post to the general post feed.
   *
   * If provided we'll only listen to posts that were posted after `latestPostId`.
   */
  subscribeToGeneralFeed(callback, latestPostId) {
    return this._subscribeToFeed('/posts/', callback, latestPostId);
  }

  /**
   * Paginates posts from the global post feed.
   *
   * Fetches a page of `POSTS_PAGE_SIZE` posts from the global feed.
   *
   * We return a Map of posts and a key to the start of the next page or
   * `null` if there is no next page.
   */
  getPosts(nextPageId = null) {
    return this._getPaginatedFeed(
      '/posts/',
      FirebaseHelper.POSTS_PAGE_SIZE,
      nextPageId
    );
  }

  /**
   * Subscribes to receive updates to the home feed. The given `callback` function gets called for
   * each new post to the general post feed.
   *
   * If provided we'll only listen to posts that were posted after `latestPostId`.
   */
  subscribeToHomeFeed(callback, latestPostId) {
    return this._subscribeToFeed(
      `/feed/${this.auth.currentUser.uid}`,
      callback,
      latestPostId,
      true
    );
  }

  /**
   * Paginates posts from the user's home feed.
   *
   * Fetches a page of `POSTS_PAGE_SIZE` posts from the user's home feed.
   *
   * We return a Map of posts and a key to the start of the next page or
   * `null` if there is no next page.
   */
  getHomeFeedPosts(nextPageId = null) {
    return this._getPaginatedFeed(
      `/feed/${this.auth.currentUser.uid}`,
      FirebaseHelper.POSTS_PAGE_SIZE,
      nextPageId,
      true
    );
  }

  /**
   * Subscribes to receive updates to the given feed. The given `callback` function gets called
   * for each new entry on the given feed.
   *
   * If provided we'll only listen to entries that were posted after `latestEntryId`. This allows to
   * listen only for new feed entries after fetching existing entries using `_getPaginatedFeed()`.
   *
   * If needed the posts details can be fetched. This is useful for shallow post feeds.
   * @private
   */
  _subscribeToFeed(
    uri,
    callback,
    latestEntryId = null,
    fetchPostDetails = false
  ) {
    // Load all posts information.
    let feedRef = this.database.ref(uri);
    if (latestEntryId) {
      feedRef = feedRef.orderByKey().startAt(latestEntryId);
    }
    feedRef.on('child_added', feedData => {
      if (feedData.key !== latestEntryId) {
        if (!fetchPostDetails) {
          callback(feedData.key, feedData.val());
        } else {
          this.database
            .ref(`/posts/${feedData.key}`)
            .once('value')
            .then(postData => callback(postData.key, postData.val()));
        }
      }
    });
    this.firebaseRefs.push(feedRef);
  }

  /**
   * Paginates entries from the given feed.
   *
   * Fetches a page of `pageSize` entries from the given feed.
   *
   * If provided we'll return entries that were posted before (and including) `earliestEntryId`.
   *
   * We return a Map of posts and a key to the start of the next page or
   * `null` if there is no next page.
   *
   * If needed the posts details can be fetched. This is useful for shallow post feeds like the user
   * home feed and the user post feed.
   * @private
   */
  _getPaginatedFeed(
    uri,
    pageSize,
    earliestEntryId = null,
    fetchPostDetails = false
  ) {
    console.log(
      'Fetching entries from',
      uri,
      'start at',
      earliestEntryId,
      'page size',
      pageSize
    );
    let ref = this.database.ref(uri);
    if (earliestEntryId) {
      ref = ref.orderByKey().endAt(earliestEntryId);
    }
    // We're fetching an additional item as a cheap way to test if there is a next page.
    return ref
      .limitToLast(pageSize + 1)
      .once('value')
      .then(data => {
        const entries = data.val() || {};
        console.log(entries);
        // Figure out if there is a next page.
        let nextPageId = null;
        const entryIds = Object.keys(entries);
        if (entryIds.length > pageSize) {
          delete entries[entryIds[0]];
          nextPageId = entryIds.shift();
        }
        if (fetchPostDetails) {
          // Fetch details of all posts.
          const queries = entryIds.map(postId => this.getPostData(postId));
          // Since all the requests are being done one the same feed it's unlikely that a single one
          // would fail and not the others so using Promise.all() is not so risky.
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
                nextPageId,
                fetchPostDetails
              );
            }
            return { entries, nextPageId };
          });
        }
        return { entries, nextPageId };
      });
  }

  /**
   * Returns the users which name match the given search query as a Promise.
   */
  searchUsers(searchString, maxResults) {
    searchString = latinize(searchString).toLowerCase();
    const query = this.database
      .ref('/people')
      .orderByChild('_search_index/full_name')
      .startAt(searchString)
      .limitToFirst(maxResults)
      .once('value');
    const reversedQuery = this.database
      .ref('/people')
      .orderByChild('_search_index/reversed_full_name')
      .startAt(searchString)
      .limitToFirst(maxResults)
      .once('value');
    return Promise.all([query, reversedQuery]).then(results => {
      const people = {};
      // construct people from the two search queries results.
      results.forEach(result =>
        result.forEach(data => {
          people[data.key] = data.val();
        })
      );

      // Remove results that do not start with the search query.
      const userIds = Object.keys(people);
      userIds.forEach(userId => {
        const name = latinize(
          people[userId]._search_index.full_name
        ).toLowerCase();
        const reversedName = latinize(
          people[userId]._search_index.reversed_full_name
        ).toLowerCase();
        if (
          !name.startsWith(searchString) &&
          !reversedName.startsWith(searchString)
        ) {
          delete people[userId];
        }
      });
      return people;
    });
  }

  /**
   * Saves or updates public user data in Firebase (such as image URL, display name...).
   */
  updatePublicProfile() {
    const user = Firebase.auth().currentUser;
    let { displayName } = user;
    let imageUrl = user.photoURL;

    // If the main profile Pic is an expiring facebook profile pic URL we'll update it automatically to use the permanent graph API URL.
    if (
      imageUrl &&
      (imageUrl.indexOf('lookaside.facebook.com') !== -1 ||
        imageUrl.indexOf('fbcdn.net') !== -1)
    ) {
      // Fid the user's Facebook UID.
      const facebookUID = user.providerData.find(
        providerData => providerData.providerId === 'facebook.com'
      ).uid;
      imageUrl = `https://graph.facebook.com/${facebookUID}/picture?type=large`;
      user.updateProfile({ photoURL: imageUrl }).then(() => {
        console.log('User profile updated.');
      });
    }

    if (!displayName) {
      displayName = 'Anonymous';
    }
    let searchFullName = displayName.toLowerCase();
    let searchReversedFullName = searchFullName
      .split(' ')
      .reverse()
      .join(' ');
    try {
      searchFullName = latinize(searchFullName);
      searchReversedFullName = latinize(searchReversedFullName);
    } catch (e) {
      console.error(e);
    }

    this.getPrivacySettings(user.uid).then(snapshot => {
      let socialEnabled = false;
      if (snapshot.val() !== null) {
        socialEnabled = snapshot.val().social;
      }

      const updateData = {
        profile_picture: imageUrl || null,
        full_name: displayName,
      };

      if (socialEnabled) {
        updateData._search_index = {
          full_name: searchFullName,
          reversed_full_name: searchReversedFullName,
        };
      }
      return this.database
        .ref(`/people/${user.uid}`)
        .update(updateData)
        .then(() => {
          console.log('Public profile updated.');
        });
    });
  }

  /**
   * Fetches a single post data.
   */
  getPostData(postId) {
    return this.database.ref(`/posts/${postId}`).once('value');
  }

  /**
   * Fetches the user's privacy settings.
   */
  getPrivacySettings(uid) {
    return this.database.ref(`/privacy/${uid}`).once('value');
  }

  setPrivacySettings(uid, settings) {
    const uri = `/privacy/${uid}`;
    this.database.ref(uri).set(settings);
  }

  async uploadImageAsync(uri) {
    const newPostKey = this.database.ref('/posts').push().key;
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    const ref = this.storage.ref(newPostKey);
    const snapshot = await ref.put(blob);

    blob.close();

    return snapshot.ref.getDownloadURL();
  }

  uploadNewPost(post) {
    const newPostKey = this.database.ref('/posts').push().key;
    const update = {};
    update[`/posts/${newPostKey}`] = {
      ...post,
      author: this.auth.currentUser.uid,
    };
    update[`/people/${this.auth.currentUser.uid}/posts/${newPostKey}`] = true;
    update[`/feed/${this.auth.currentUser.uid}/${newPostKey}`] = true;

    return this.database
      .ref()
      .update(update)
      .then(() => newPostKey);
  }

  removeFromSearch(uid) {
    this.database.ref(`people/${uid}/_search_index`).remove();
  }

  /**
   * Deletes the given post from the global post feed and the user's post feed. Also deletes
   * comments, likes and the file on Cloud Storage.
   */
  deletePost(postId, picStorageUri, thumbStorageUri) {
    console.log(`Deleting ${postId}`);
    const updateObj = {};
    updateObj[`/people/${this.auth.currentUser.uid}/posts/${postId}`] = null;
    updateObj[`/comments/${postId}`] = null;
    updateObj[`/likes/${postId}`] = null;
    updateObj[`/posts/${postId}`] = null;
    updateObj[`/feed/${this.auth.currentUser.uid}/${postId}`] = null;
    const deleteFromDatabase = this.database.ref().update(updateObj);
    if (picStorageUri) {
      let deletePicFromStorage;
      let deleteThumbFromStorage;
      if (picStorageUri.startsWith('gs:/')) {
        deletePicFromStorage = this.storage.refFromURL(picStorageUri).delete();
        deleteThumbFromStorage = this.storage
          .refFromURL(thumbStorageUri)
          .delete();
      } else {
        deletePicFromStorage = this.storage.ref(picStorageUri).delete();
        deleteThumbFromStorage = this.storage.ref(thumbStorageUri).delete();
      }
      return Promise.all([
        deleteFromDatabase,
        deletePicFromStorage,
        deleteThumbFromStorage,
      ]);
    }
    return deleteFromDatabase;
  }

  /**
   * Flags the posts for inappropriate content.
   */
  reportPost(postId) {
    return this.database
      .ref(`/postFlags/${postId}/${this.auth.currentUser.uid}`)
      .set(true);
  }

  /**
   * Flags the comment for inappropriate content.
   */
  reportComment(postId, commentId) {
    return this.database
      .ref(`/commentFlags/${postId}/${commentId}/${this.auth.currentUser.uid}`)
      .set(true);
  }

  /**
   * Deletes the given postId entry from the user's home feed.
   */
  deleteFromFeed(uri, postId) {
    return this.database.ref(`${uri}/${postId}`).remove();
  }

  /**
   * Listens to deletions on posts from the global feed.
   */
  registerForPostsDeletion(deletionCallback) {
    const postsRef = this.database.ref(`/posts`);
    postsRef.on('child_removed', data => deletionCallback(data.key));
    this.firebaseRefs.push(postsRef);
  }

  /**
   * Load a single user profile information
   */
  loadUserProfile(uid) {
    return this.database.ref(`/people/${uid}`).once('value');
  }
}

export default new FirebaseHelper();
