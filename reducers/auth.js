import { handleActions } from 'redux-actions';
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
    [LOGIN_REQUEST]: state => ({
      ...state,
      isFetching: true,
    }),

    [LOGIN_SUCCESS]: state => ({
      ...state,
      isFetching: false,
      loggedIn: true,
      errorMessage: '',
    }),

    [LOGIN_FAILURE]: (state, action) => ({
      ...state,
      isFetching: false,
      loggedIn: false,
      hasError: true,
      errorMessage: action.payload.message,
    }),

    [LOGOUT_REQUEST]: state => ({
      ...state,
      isFetching: true,
    }),

    [LOGOUT_SUCCESS]: () => ({
      ...initialState,
    }),

    [LOGOUT_FAILURE]: (state, action) => ({
      ...state,
      isFetching: false,
      loggedIn: true,
      hasError: true,
      errorMessage: action.payload.message,
    }),

    [SIGNUP_REQUEST]: state => ({
      ...state,
      isFetching: true,
    }),

    [SIGNUP_SUCCESS]: () => ({
      ...initialState,
      signUpSuccess: true,
    }),

    [SIGNUP_FAILURE]: (state, action) => ({
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

    [SYNC_USER_NULL]: state => ({
      ...state,
      user: null,
    }),
  },
  initialState
);
