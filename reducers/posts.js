import { handleActions } from 'redux-actions';
import { POST_SET_PEOPLE_KEY } from '../constants/posts';

const initialState = {
  peopleKey: null,
};

export default handleActions(
  {
    [POST_SET_PEOPLE_KEY]: (state, action) => ({
      ...state,
      peopleKey: action.payload.key,
    }),
  },
  initialState
);
