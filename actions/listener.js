import { createAction } from 'redux-actions';
import * as types from '../constants/listener';

export const firebaseListenRequest = createAction(
  types.FIREBASE_LISTEN_REQUEST,
  (ref, metaType) => ({
    ref,
    metaType,
  })
);

export const firebaseListenFailure = createAction(
  types.FIREBASE_LISTEN_FAILURE
);

export const firebaseListenSuccess = createAction(
  types.FIREBASE_LISTEN_SUCCESS,
  (items, metaType) => ({
    items,
    metaType,
  })
);

export const firebaseListenChildAdded = createAction(
  types.FIREBASE_LISTEN_CHILD_ADDED,
  (pid, value, metaType) => ({
    pid,
    value,
    metaType,
  })
);

export const firebaseListenRemoved = createAction(
  types.FIREBASE_LISTEN_REMOVED,
  (clearItems, metaType) => ({
    clearItems,
    metaType,
  })
);

export const firebaseRemoveListenerRequested = createAction(
  types.FIREBASE_REMOVE_LISTENER_REQUEST,
  (clearItems, metaType) => ({
    clearItems,
    metaType,
  })
);