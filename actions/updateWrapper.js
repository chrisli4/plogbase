import { firebaseUpdateRequested } from './update';

export function updatePostRequested(postId, post) {
  return firebaseUpdateRequested(postId, post, 'POSTS');
};
