import { createAction } from 'redux-actions';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SYNC_USER,
  SYNC_USER_NULL,
} from '../constants/auth';

export const login = createAction(LOGIN_REQUEST, (username, password) => ({
  username,
  password,
}));

export const loginSuccess = createAction(LOGIN_SUCCESS);

export const loginFailure = createAction(LOGIN_FAILURE);

export const logout = createAction(LOGOUT_REQUEST);

export const logoutSuccess = createAction(LOGOUT_SUCCESS);

export const logoutFailure = createAction(LOGOUT_FAILURE);

export const signUp = createAction(SIGNUP_REQUEST, (username, password) => ({
  username,
  password,
}));

export const signUpSuccess = createAction(SIGNUP_SUCCESS);

export const signUpFailure = createAction(SIGNUP_FAILURE);

export const syncUser = createAction(SYNC_USER, user => ({
  user,
}));

export const syncUserNull = createAction(SYNC_USER_NULL);
