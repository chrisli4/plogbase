import { createAction } from 'redux-actions';
import {
  IMAGE_PICK_REQUEST,
  IMAGE_PICK_SUCCESS,
  IMAGE_PICK_FAILURE,
} from '../constants/image';

export const pickImage = createAction(IMAGE_PICK_REQUEST);

export const pickImageSuccess = createAction(IMAGE_PICK_SUCCESS, image => ({
  image,
}));

export const pickImageFailure = createAction(IMAGE_PICK_FAILURE);
