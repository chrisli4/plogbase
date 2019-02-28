import { handleActions } from 'redux-actions';
import {
  PICK_IMAGE_SUCCESS,
  PICK_IMAGE_FAILURE,
} from '../constants/image';

const initialState = {
  image: '',
  errorMessage: '',
};

export default handleActions(
  {
    [PICK_IMAGE_SUCCESS]: (state, action) => ({
      ...state,
      image: action.payload.image,
      errorMessage: '',
    }),

    [PICK_IMAGE_FAILURE]: (state, action) => ({
      ...initialState,
      errorMessage: action.payload.message,
    }),
  },
  initialState
);
