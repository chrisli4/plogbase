import { createAction } from 'redux-actions';
import {
  FIREBASE_UPDATE_REQUESTED,
  FIREBASE_UPDATE_FULFILLED,
  FIREBASE_UPDATE_REJECTED,
} from '../constants/update';

export const firebaseUpdateRequested = createAction(
  FIREBASE_UPDATE_REQUESTED,
  (postId, post, metaType) => ({
    postId,
    post,
    metaType,
  })
);

export const firebaseUpdateFulfilled = createAction(
  FIREBASE_UPDATE_FULFILLED,
  metaType => ({
    metaType,
  })
);

export const firebaseUpdateRejected = createAction(
  FIREBASE_UPDATE_REJECTED,
  (error, metaType) => ({
    error,
    metaType,
  })
);
