import { handleActions } from 'redux-actions';
import { FIREBASE_LISTEN_CHILD_ADDED } from '../constants/listener';

const initialState = {
  followIds: [],
  discoverIds: [],
  userIds: [],
  byId: {},
};

export default handleActions(
  {
  },
  initialState
);
