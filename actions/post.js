import { createAction } from 'redux-actions';
import {
  POST_GET_REQUEST,
  POST_GET_SUCCESS,
  POST_GET_FAILURE,
} from '../constants/post';

export const getPost = createAction(POST_GET_REQUEST, cursor => ({ cursor }));

export const getPostSuccess = createAction(POST_GET_SUCCESS, posts => ({
  posts,
}));

export const getPostFailure = createAction(POST_GET_FAILURE, error => ({
  error,
}));
