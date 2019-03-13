import { createAction } from 'redux-actions';
import { CURSOR_SET } from '../constants/cursors';

export const setCursor = createAction(CURSOR_SET, (cursor, metaType) => ({
  cursor,
  metaType,
}));
