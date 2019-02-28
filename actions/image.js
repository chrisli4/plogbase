import { createAction } from 'redux-actions';
import {
  PICK_IMAGE_REQUEST,
  PICK_IMAGE_SUCCESS,
  PICK_IMAGE_FAILURE,
} from '../constants/image';

export const pickImage = createAction(PICK_IMAGE_REQUEST);

export const pickImageSuccess = createAction(PICK_IMAGE_SUCCESS, image => ({
  image,
}));

export const pickImageFailure = createAction(PICK_IMAGE_FAILURE);
