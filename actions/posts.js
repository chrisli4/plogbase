import { createAction } from 'redux-actions';
import {
  POSTS_FETCH_REQUEST,
  POSTS_FETCH_SUCCESS,
  POSTS_FETCH_FAILURE,
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

export const clearPosts = createAction(POSTS_CLEAR, metaType => ({
  metaType,
}));