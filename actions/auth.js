import { createAction } from 'redux-actions';
import {
  LOGIN_REQUESTED,
  LOGIN_FULFILLED,
  LOGIN_REJECTED,
  LOGOUT_REQUESTED,
  LOGOUT_FULFILLED,
  LOGOUT_REJECTED,
  SIGNUP_REQUESTED,
  SIGNUP_FULFILLED,
  SIGNUP_REJECTED,
  SYNC_USER,
} from '../constants/auth';

export const login = createAction(LOGIN_REQUESTED, (username, password) => ({
  username,
  password,
}));

export const loginFulfilled = createAction(LOGIN_FULFILLED);

export const loginRejected = createAction(LOGIN_REJECTED);

export const logout = createAction(LOGOUT_REQUESTED);

export const logoutFulfilled = createAction(LOGOUT_FULFILLED);

export const logoutRejected = createAction(LOGOUT_REJECTED);

export const signUp = createAction(SIGNUP_REQUESTED, (username, password) => ({
  username,
  password,
}));

export const signUpFulfilled = createAction(SIGNUP_FULFILLED);

export const signUpRejected = createAction(SIGNUP_REJECTED);

export const syncUser = createAction(SYNC_USER, user => ({
  user,
}));
