import { Firebase } from '../lib/firebase';
import { firebaseListenRequested } from './listener';

export function subscribeToUserPosts(uid) {
  const ref = Firebase.database()
    .ref(`people/${uid}/posts`)
    .limitToLast(3);
  return firebaseListenRequested(ref, 'PEOPLE', true);
}

export function subscribeToPosts() {
  const ref = Firebase.database()
    .ref(`posts`)
    .limitToLast(3);
  return firebaseListenRequested(ref, 'POSTS', false);
}

export function subscribeToFollowPosts(uid) {
  const ref = Firebase.database()
    .ref(`follow/${uid}`)
    .limitToLast(3);
  return firebaseListenRequested(ref, 'FOLLOW', true);
}
