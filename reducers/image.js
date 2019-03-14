import { handleActions } from 'redux-actions';
import { IMAGE_PICK_SUCCESS, IMAGE_PICK_FAILURE } from '../constants/image';

const initialState = {
  result: {},
  error: null,
};

export default handleActions(
  {
    [IMAGE_PICK_SUCCESS]: (state, action) => ({
      ...state,
      result: action.payload.image,
    }),
    [IMAGE_PICK_FAILURE]: (state, action) => ({
      ...state,
      error: action.error.message,
    }),
  },
  initialState
);
