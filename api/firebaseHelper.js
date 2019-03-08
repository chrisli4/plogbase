import { Firebase } from '../lib/firebase';
import configureStore from '../store';

class FirebaseHelper {
  constructor(dispatch) {
    // Firebase SDK.
    this.database = Firebase.database();
    this.storage = Firebase.storage();
    this.auth = Firebase.auth();
    this.dispatch = dispatch;

    // Firebase references that are listened to.
    this.firebaseRefs = [];
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
   _subscribeToFeed(uri, dispatch, latestEntryId = null, fetchPostDetails = false) {
     let feedRef = this.database.ref(uri);
     if (latestEntryId) {
       feedRef = feedRef.orderByKey().startAt(latestEntryId);
     }
     feedRef.on('child_added', feedData => {
        if (!fetchPostDetails) {
          dispatch({ type: 'CHILD_ADDED', payload: { key: feedData.key, data: feedData.val() }});
        } else {
          this.database.ref(`/posts/${feedData.key}`).once('value').then(
              (postData) => callback(postData.key, postData.val()));
        }
      }
     })
   }
}

export default new FirebaseHelper(configureStore.store.dispatch);
