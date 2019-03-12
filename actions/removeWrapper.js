import { firebaseRemoveRequested } from './remove';

export function removePostRequested(postId) {
  return firebaseRemoveRequested(postId, 'POSTS');
}
