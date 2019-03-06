import { createAction } from 'redux-actions';
import * as types from '../constants/auth';

export const login = createAction(
  types.LOGIN_REQUEST,
  (username, password) => ({
    username,
    password,
  })
);

export const loginSuccess = createAction(types.LOGIN_SUCCESS);

export const loginFailure = createAction(types.LOGIN_FAILURE);

export const logout = createAction(types.LOGOUT_REQUEST);

export const logoutSuccess = createAction(types.LOGOUT_SUCCESS);

export const logoutFailure = createAction(types.LOGOUT_FAILURE);

export const signUp = createAction(
  types.SIGNUP_REQUEST,
  (username, password) => ({
    username,
    password,
  })
);

export const signUpSuccess = createAction(types.SIGNUP_SUCCESS);

export const signUpFailure = createAction(types.SIGNUP_FAILURE);

export const syncUser = createAction(types.SYNC_USER, user => ({
  user,
}));
