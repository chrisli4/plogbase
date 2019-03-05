import { eventChannel, buffers } from 'redux-saga';
import { put, take, call, fork, cancel, flush } from 'redux-saga/effects';
import * as types from '../constants/listener';
import {
  firebaseListenSuccess,
  firebaseListenFailure,
  firebaseListenChildAdded,
  firebaseListenRemoved,
} from '../actions/listener';

export function createEventChannel(ref) {
  const listener = eventChannel(emit => {
    ref.on('child_added', snap => {
      emit({
        key: snap.key,
        value: snap.val(),
      });
    });
    return () => {
      ref.off();
    };
  }, buffers.expanding(1));
  return listener;
}

export function* getDataAndListenToChannel(ref, metaType) {
  const chan = yield call(createEventChannel, ref);
  try {
    try {
      const snap = yield call([ref, ref.once], 'value');
      yield flush(chan);
      const val = snap.val();
      const value = val || {};
      yield put(firebaseListenSuccess(value, metaType));
    } catch (error) {
      yield put(firebaseListenFailure(error, metaType));
    }
    while (true) {
      const data = yield take(chan);
      yield put(firebaseListenChildAdded(data.key, data.value, metaType));
    }
  } finally {
    chan.close();
  }
}

export function* watchListener(metaType) {
  while (true) {
    const listenRequestAction = yield take(types.FIREBASE_LISTEN_REQUEST);
    if (listenRequestAction.type === metaType) {
      let task = yield fork(
        getDataAndListenToChannel,
        listenRequestAction.payload.ref,
        metaType
      );
      while (true) {
        const action = yield take([
          types.FIREBASE_REMOVE_LISTENER_REQUESTED,
          types.FIREBASE_LISTEN_REQUESTED,
        ]);

        if (action.type === metaType) {
          yield cancel(task);
          yield put(
            firebaseListenRemoved(!!action.payload.clearItems, metaType)
          );

          if (action.type === types.FIREBASE_LISTEN_REQUEST) {
            task = yield fork(
              getDataAndListenToChannel,
              action.payload.ref,
              metaType
            );
          } else {
            break;
          }
        }
      }
    }
  }
}
