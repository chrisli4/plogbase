import { handleActions } from 'redux-actions';
import {
  CURSOR_SET,
} from '../constants/cursors';

const initialState = {
  POSTS: null,
};

export default handleActions(
  {
    [CURSOR_SET]: (state, action) => ({
      ...state,
      [action.payload.metaType]: action.payload.cursor,
    }),
  },
  initialState
);
