import { createAction } from 'redux-actions';
import {
  POSTS_FETCH_REQUEST,
  POSTS_FETCH_SUCCESS,
  POSTS_FETCH_FAILURE,
  POST_ADD_REQUEST,
  POST_ADD_SUCCESS,
  POST_ADD_FAILURE,
  POSTS_CLEAR,
} from '../constants/posts';

export const fetchPosts = createAction(
  POSTS_FETCH_REQUEST,
  (uri, cursor, metaType) => ({
    uri,
    cursor,
    metaType,
  })
);

export const fetchPostsSuccess = createAction(
  POSTS_FETCH_SUCCESS,
  (posts, metaType) => ({
    posts,
    metaType,
  })
);

export const fetchPostsFailure = createAction(
  POSTS_FETCH_FAILURE,
  (error, metaType) => ({
    error,
    metaType,
  })
);

export const addPost = createAction(POST_ADD_REQUEST, post => ({
  post,
}));

export const addPostSuccess = createAction(POST_ADD_SUCCESS, postId => ({
  postId,
}));

export const addPostFailure = createAction(POST_ADD_FAILURE, error => ({
  error,
}));

export const clearPosts = createAction(POSTS_CLEAR, metaType => ({
  metaType,
}));
