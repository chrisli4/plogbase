import { handleActions } from 'redux-actions';
import {
  POSTS_FETCH_SUCCESS,
  POSTS_FETCH_FAILURE,
  POSTS_CLEAR,
} from '../constants/posts';

const initialState = {
  POSTS: [],
  PEOPLE: [],
  error: null,
};

export default handleActions(
  {
    [POSTS_FETCH_SUCCESS]: (state, action) => ({
      ...state,
      [action.payload.metaType]: [
        ...state[action.payload.metaType],
        ...action.payload.posts,
      ],
    }),
    [POSTS_CLEAR]: (state, action) => ({
      ...state,
      [action.payload.metaType]: [],
    }),
    [POSTS_FETCH_FAILURE]: (state, action) => ({
      ...state,
      error: action.payload.error,
    }),
  },
  initialState
);
