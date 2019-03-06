import { Firebase } from '../lib/firebase';

/**
 * Handles all Firebase interactions.
 */
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
  }

  /**
   * Fetches a single post data.
   */
  getPostData(postId) {
    return this.database.ref(`/posts/${postId}`).once('value');
  }
}

export default new FirebaseHelper();
