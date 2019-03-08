import { createAction } from 'redux-actions';
import {
  FIREBASE_LISTEN_REQUESTED,
  FIREBASE_LISTEN_FULFILLED,
  FIREBASE_LISTEN_REJECTED,
  FIREBASE_LISTEN_CHILD_ADDED,
  FIREBASE_LISTEN_CHILD_CHANGED,
  FIREBASE_LISTEN_CHILD_REMOVED,
  FIREBASE_LISTEN_REMOVED,
  FIREBASE_REMOVE_LISTENER_REQUESTED,
} from '../constants/listener';

export const firebaseListenRequested = createAction(
  FIREBASE_LISTEN_REQUESTED,
  (ref, metaType, fetchPostDetails) => ({
    ref,
    metaType,
    fetchPostDetails,
  })
);

export const firebaseListenRejected = createAction(
  FIREBASE_LISTEN_REJECTED,
  (error, metaType) => ({
    error,
    metaType,
  })
);

export const firebaseListenFulfilled = createAction(
  FIREBASE_LISTEN_FULFILLED,
  (items, metaType, fetchPostDetails) => ({
    items,
    metaType,
    fetchPostDetails,
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

export const firebaseListenChildChanged = createAction(
  FIREBASE_LISTEN_CHILD_CHANGED,
  (id, value, metaType) => ({
    id,
    value,
    metaType,
  })
);

export const firebaseListenChildRemoved = createAction(
  FIREBASE_LISTEN_CHILD_REMOVED,
  (id, metaType) => ({
    id,
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
