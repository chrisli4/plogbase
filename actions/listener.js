import { createAction } from 'redux-actions';
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
