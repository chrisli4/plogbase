import { handleActions } from 'redux-actions';
import {
  POSTS_FETCH_SUCCESS,
  POSTS_FETCH_FAILURE,
  POSTS_CLEAR,
} from '../constants/posts';

const initialState = {
  posts: [],
  homePosts: [],
  followPosts: [],
};

export default handleActions(
  {
    [POSTS_FETCH_SUCCESS]: (state, action) => ({
      ...state,
      posts: [...state.posts, ...action.payload.posts],
    }),
    [POSTS_CLEAR]: () => ({
      posts: [],
    }),
    [POSTS_FETCH_FAILURE]: (state, action) => ({
      ...state,
      error: action.error,
    }),
  },
  initialState
);
