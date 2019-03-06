import { Firebase } from '../lib/firebase';
import { firebaseListenRequested } from './listener';

export function subscribeToUserPosts(uid) {
  const ref = Firebase.database()
    .ref(`people/${uid}/posts`)
    .limitToLast(5);
  return firebaseListenRequested(ref, 'people');
}
