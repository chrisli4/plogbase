import { eventChannel, buffers } from 'redux-saga';
import { put, take, call, fork, cancel, flush } from 'redux-saga/effects';
import {
  FIREBASE_LISTEN_REQUESTED,
  FIREBASE_REMOVE_LISTENER_REQUESTED,
  FIREBASE_REMOVE_ALL_LISTENERS_REQUESTED,
} from '../constants/listener';
import {
  firebaseListenFulfilled,
  firebaseListenRejected,
  firebaseListenRemoved,
  firebaseListenChildAdded,
  firebaseListenChildChanged,
  firebaseListenChildRemoved,
} from '../actions/listener';

export function createEventChannel(ref) {
  const listener = eventChannel(emit => {
    ref.on('child_added', snap => {
      emit({
        eventType: 'CHILD_ADDED',
        key: snap.key,
        value: snap.val(),
      });
    });

    ref.on('child_changed', snap => {
      const val = snap.val();
      emit({
        eventType: 'CHILD_CHANGED',
        key: snap.key,
        value: snap.val(),
      });
    });

    ref.on('child_removed', snap => {
      emit({ eventType: 'CHILD_REMOVED', key: snap.key });
    });
    return () => {
      ref.off();
    };
  }, buffers.expanding(1));
  return listener;
}

export function getUpdateAction(data, metaType) {
  switch (data.eventType) {
    case 'CHILD_ADDED':
      return firebaseListenChildAdded(data.key, data.value, metaType);
    case 'CHILD_CHANGED':
      return firebaseListenChildChanged(data.key, data.value, metaType);
    case 'CHILD_REMOVED':
      return firebaseListenChildRemoved(data.key, metaType);
    default:
  }
}

export function* _subscribeToFeed(ref, metaType, fetchPostDetails) {
  const chan = yield call(createEventChannel, ref);
  try {
    try {
      const snap = yield call([ref, ref.once], 'value');
      yield flush(chan);
      const val = snap.val();
      const value = val || {};
      yield put(firebaseListenFulfilled(value, metaType, fetchPostDetails));
    } catch (error) {
      yield put(firebaseListenRejected(error, metaType));
    }
    while (true) {
      const data = yield take(chan);
      yield put(getUpdateAction(data, metaType));
    }
  } finally {
    chan.close();
  }
}

export function* watchListener(metaType) {
  while (true) {
    const listenRequestAction = yield take(FIREBASE_LISTEN_REQUESTED);
    if (listenRequestAction.payload.metaType === metaType) {
      const task = yield fork(
        _subscribeToFeed,
        listenRequestAction.payload.ref,
        listenRequestAction.payload.metaType,
        listenRequestAction.payload.fetchPostDetails
      );
      while (true) {
        const action = yield take([
          FIREBASE_REMOVE_LISTENER_REQUESTED,
          FIREBASE_LISTEN_REQUESTED,
          FIREBASE_REMOVE_ALL_LISTENERS_REQUESTED,
        ]);

        if (
          action.type === FIREBASE_REMOVE_ALL_LISTENERS_REQUESTED ||
          action.payload.metaType === metaType
        ) {
          yield cancel(task);
          yield put(
            firebaseListenRemoved(!!action.payload.clearItems, metaType)
          );

          if (action.payload.metaType === FIREBASE_LISTEN_REQUESTED) {
            task = yield fork(
              _subscribeToFeed,
              action.payload.ref,
              action.payload.metaType,
              action.payload.fetchPostDetails
            );
          } else {
            break;
          }
        }
      }
    }
  }
}
