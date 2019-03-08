import { createAction } from 'redux-actions';

import {
  FIREBASE_REMOVE_REQUESTED,
  FIREBASE_REMOVE_FULFILLED,
  FIREBASE_REMOVE_REJECTED,
} from '../constants/remove';

export const firebaseRemoveRequested = createAction(
  FIREBASE_REMOVE_REQUESTED,
  (postId, metaType) => ({
    postId,
    metaType,
  })
);

export const firebaseRemoveRejected = createAction(
  FIREBASE_REMOVE_REJECTED,
  (error, metaType) => ({
    error,
    metaType,
  })
);

export const firebaseRemoveFulfilled = createAction(
  FIREBASE_REMOVE_FULFILLED,
  metaType => ({
    metaType,
  })
);
