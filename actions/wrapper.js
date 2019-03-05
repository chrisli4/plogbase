import { Firebase } from '../lib/firebase';
import { firebaseListenRequested, firebaseRemoveListenerRequested } from './listener';

export function listenToUserPosts(uid) {
  const ref = Firebase.database().ref(`people/${uid}`);
  return firebaseListenRequested(ref, 'people');
};

export function removeUserPostsListenerRequested() {
  return firebaseRemoveListenerRequested(false, 'people');
};
