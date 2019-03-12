import { handleActions } from 'redux-actions';
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

const initialState = {
  loggedIn: false,
  isFetching: false,
  hasError: false,
  signUpSuccess: false,
  errorMessage: '',
  user: null,
};

export default handleActions(
  {
    [LOGIN_REQUESTED]: state => ({
      ...state,
      isFetching: true,
    }),

    [LOGIN_FULFILLED]: state => ({
      ...state,
      isFetching: false,
      loggedIn: true,
      errorMessage: '',
    }),

    [LOGIN_REJECTED]: (state, action) => ({
      ...state,
      isFetching: false,
      loggedIn: false,
      hasError: true,
      errorMessage: action.payload.message,
    }),

    [LOGOUT_REQUESTED]: state => ({
      ...state,
      isFetching: true,
    }),

    [LOGOUT_FULFILLED]: () => ({
      ...initialState,
    }),

    [LOGOUT_REJECTED]: (state, action) => ({
      ...state,
      isFetching: false,
      loggedIn: true,
      hasError: true,
      errorMessage: action.payload.message,
    }),

    [SIGNUP_REQUESTED]: state => ({
      ...state,
      isFetching: true,
    }),

    [SIGNUP_FULFILLED]: () => ({
      ...initialState,
      signUpSuccess: true,
    }),

    [SIGNUP_REJECTED]: (state, action) => ({
      ...state,
      isFetching: false,
      loggedIn: false,
      hasError: true,
      errorMessage: action.payload.message,
    }),

    [SYNC_USER]: (state, action) => ({
      ...state,
      user: action.payload.user,
    }),
  },
  initialState
);
