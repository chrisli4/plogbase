import { Firebase } from '../lib/firebase';

class FirebaseHelper {
  constructor() {
    // Firebase SDK.
    this.database = Firebase.database();
    this.storage = Firebase.storage();
    this.auth = Firebase.auth();
  }
}

export default new FirebaseHelper();
