import { createAction } from 'redux-actions';
import * as types from '../constants/posts';

export const addPost = createAction(types.POST_ADD_REQUEST, (uid, post) => ({
  uid,
  post,
}));

export const addPostSuccess = createAction(types.POST_ADD_SUCCESS, pid => ({
  pid,
}));

export const addPostFailure = createAction(types.POST_ADD_FAILURE);

export const updatePost = createAction(
  types.POST_UPDATE_REQUEST,
  (uid, post) => ({
    uid,
    post,
  })
);

export const updatePostSuccess = createAction(types.POST_ADD_SUCCESS, pid => ({
  pid,
}));

export const updatePostFailure = createAction(types.POST_UPDATE_FAILURE);

export const deletePost = createAction(
  types.POST_DELETE_REQUEST,
  (uid, pid) => ({
    uid,
    pid,
  })
);

export const deletePostSuccess = createAction(
  types.POST_DELETE_SUCCESS,
  pid => ({
    pid,
  })
);

export const deletePostFailure = createAction(types.POST_DELETE_FAILURE);
