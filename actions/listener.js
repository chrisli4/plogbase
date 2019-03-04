import { createAction } from 'redux-actions';
import { Firebase } from '../lib/firebase';
import {
  FIREBASE_LISTEN_REQUESTED,
  FIREBASE_LISTEN_FULFILLED,
  FIREBASE_LISTEN_REJECTED,
  FIREBASE_LISTEN_CHILD_ADDED,
  FIREBASE_LISTEN_REMOVED,
  FIREBASE_REMOVE_LISTENER_REQUESTED,
} from '../constants/listener';

export const firebaseListenRequested = createAction(
  FIREBASE_LISTEN_REQUESTED,
  (ref, metaType) => ({
    ref,
    metaType,
  })
);

export const firebaseListenRejected = createAction(FIREBASE_LISTEN_REJECTED);

export const firebaseListenFulfilled = createAction(
  FIREBASE_LISTEN_FULFILLED,
  (items, metaType) => ({
    items,
    metaType,
  })
);

export const firebaseListenChildAdded = createAction(
  FIREBASE_LISTEN_CHILD_ADDED,
  (id, value, metaType) => ({
    id,
    value,
    metaType,
  })
);

export const firebaseListenRemoved = createAction(
  FIREBASE_LISTEN_REMOVED,
  (clearItems, metaType) => ({
    clearItems,
    metaType,
  })
);

export const firebaseRemoveListenerRequested = createAction(
  FIREBASE_REMOVE_LISTENER_REQUESTED,
  (clearItems, metaType) => ({
    clearItems,
    metaType,
  })
);

export function listenToUserFeed(uid) {
  const ref = Firebase.database()
    .ref(`feed/${uid}`)
    .limitToLast(3);
  return firebaseListenRequested(ref, 'feed');
}

export function listenToPostFeed() {
  const ref = Firebase.database()
    .ref(`posts`)
    .limitToLast(5);
  return firebaseListenRequested(ref, 'posts');
}

export function removeUserFeedListenerRequested() {
  return firebaseRemoveListenerRequested(false, 'feed');
}

export function removePostFeedListenerRequested() {
  return firebaseRemoveListenerRequested(false, 'posts');
}
