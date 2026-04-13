import { all } from 'redux-saga/effects';
import allJobsSaga from './allJobsSaga';
import jobSaga from './jobSaga';
import userSaga from './userSaga';

export default function* rootSaga() {
  yield all([userSaga(), jobSaga(), allJobsSaga()]);
}
