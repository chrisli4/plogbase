import { createAction } from 'redux-actions';
import {
  POST_FETCH_REQUESTED,
  POST_FETCH_DETAILS_FULFILLED,
  POST_SET_PEOPLE_KEY,
  POST_SET_FOLLOW_KEY,
  POST_SET_POSTS_KEY,
} from '../constants/posts';

export const fetchPosts = createAction(POST_FETCH_REQUESTED);

export const fetchPostDetailsFulfilled = createAction(
  POST_FETCH_DETAILS_FULFILLED,
  (posts, metaType) => ({
    posts,
    metaType,
  })
);

export const setPeopleKey = createAction(POST_SET_PEOPLE_KEY, key => ({
  key,
}));

export const setPostsKey = createAction(POST_SET_POSTS_KEY, key => ({
  key,
}));

export const setFollowKey = createAction(POST_SET_FOLLOW_KEY, key => ({
  key,
}));
