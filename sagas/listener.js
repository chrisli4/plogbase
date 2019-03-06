import { eventChannel, buffers } from 'redux-saga';
import { put, take, call, fork, cancel, flush } from 'redux-saga/effects';
import {
  FIREBASE_LISTEN_REQUESTED,
  FIREBASE_REMOVE_LISTENER_REQUESTED,
} from '../constants/listener';
import {
  firebaseListenRejected,
  firebaseListenFulfilled,
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
      yield put(firebaseListenFulfilled(value, metaType));
    } catch (error) {
      yield put(firebaseListenRejected(error, metaType));
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
    const listenRequestAction = yield take(FIREBASE_LISTEN_REQUESTED);
    if (listenRequestAction.payload.metaType === metaType) {
      let task = yield fork(
        getDataAndListenToChannel,
        listenRequestAction.payload.ref,
        metaType
      );
      while (true) {
        const action = yield take([
          FIREBASE_REMOVE_LISTENER_REQUESTED,
          FIREBASE_LISTEN_REQUESTED,
        ]);

        if (action.payload.metaType === metaType) {
          yield cancel(task);
          yield put(
            firebaseListenRemoved(!!action.payload.clearItems, metaType)
          );

          if (action.type === FIREBASE_LISTEN_REQUESTED) {
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
