import { handleActions } from 'redux-actions';
import {
  PLANT_UPLOAD_REQUEST,
  PLANT_UPLOAD_SUCCESS,
  PLANT_UPLOAD_FAILURE,
} from '../constants/upload';

const initialState = {
  uploading: false,
  postKey: '',
  errorMessage: '',
};

export default handleActions(
  {
    [PLANT_UPLOAD_REQUEST]: state => ({
      ...state,
      uploading: true,
    }),
    
    [PLANT_UPLOAD_SUCCESS]: (state, action) => ({
      ...state,
      uploading: false,
      postKey: action.payload.postKey,
    }),

    [PLANT_UPLOAD_FAILURE]: (state, action) => ({
      ...state,
      uploading: false,
      errorMessage: action.payload.message,
    }),
  },
  initialState
);
