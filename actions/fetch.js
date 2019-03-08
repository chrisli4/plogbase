import { createAction } from 'redux-actions';
import { POST_FETCH_DETAILS_FULFILLED } from '../constants/posts';

export const fetchPostDetailsFulfilled = createAction(
  POST_FETCH_DETAILS_FULFILLED,
  (posts, metaType) => ({
    posts,
    metaType,
  })
);
