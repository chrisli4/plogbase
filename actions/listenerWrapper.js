import { Firebase } from '../lib/firebase';
import { firebaseListenRequested } from './listener';

export function subscribeToUserPosts(uid, endAt) {
  let ref = Firebase.database()
    .ref(`people/${uid}/posts`)
    .limitToLast(3);
  if (endAt) {
    ref = ref.endAt(endAt);
  }
  return firebaseListenRequested(ref, 'PEOPLE', true);
}

export function subscribeToPosts(endAt) {
  let ref = Firebase.database()
    .ref(`posts`)
    .orderByKey()
    .limitToLast(3);
  if (endAt) {
    ref = ref.endAt(endAt);
  }
  return firebaseListenRequested(ref, 'POSTS', false);
}

export function subscribeToFollowPosts(uid, endAt) {
  let ref = Firebase.database()
    .ref(`follow/${uid}`)
    .limitToLast(3);
  if (endAt) {
    ref = ref.endAt(endAt);
  }
  return firebaseListenRequested(ref, 'FOLLOW', true);
}
