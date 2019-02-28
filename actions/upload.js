import { createAction } from 'redux-actions';
import {
  PLANT_UPLOAD_REQUEST,
  PLANT_UPLOAD_SUCCESS,
  PLANT_UPLOAD_FAILURE,
} from '../constants/upload';

export const plantUpload = createAction(
  PLANT_UPLOAD_REQUEST,
  (name, species, age) => ({
    name,
    species,
    age,
  })
);

export const plantUploadSuccess = createAction(PLANT_UPLOAD_SUCCESS, postKey => ({
  postKey,
}));

export const plantUploadFailure = createAction(PLANT_UPLOAD_FAILURE);
