import { handleActions } from 'redux-actions';
import {
  POST_SYNC,
  POST_USER_SYNC,
  POST_FOLLOW_SYNC,
} from '../constants/posts';

const initialState = {
  followIds: [],
  userIds: [],
  postIds: [],
  byId: {},
};

export default handleActions(
  {
    [POST_USER_SYNC]: (state, action) => ({
      ...state,
      byId: {
        ...state.byId,
        ...action.payload.posts,
      },
    }),
  },
  initialState
);
