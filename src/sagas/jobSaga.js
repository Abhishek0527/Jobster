import { call, put, select, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import customFetch from '../utils/axios';
import {
  clearValues,
  createjobFailure,
  createjobRequest,
  createjobSuccess,
  editJobFailure,
  editJobRequest,
  editJobSuccess,
} from '../features/job/jobSlice';
import { logoutuser } from '../features/user/userSlice';

const authHeader = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const getErrorMessage = (error, fallback) => error?.response?.data?.msg || fallback;

function* createJobWorker({ payload }) {
  try {
    const token = yield select((state) => state.user.user?.token);
    yield call([customFetch, customFetch.post], '/jobs', payload, authHeader(token));
    yield put(createjobSuccess());
    yield put(clearValues());
    yield call(toast.success, 'Job Created');
  } catch (error) {
    if (error?.response?.status === 401) {
      yield put(logoutuser());
    }
    const message = getErrorMessage(error, 'unable to create job');
    yield put(createjobFailure(message));
    yield call(toast.error, message);
  }
}

function* editJobWorker({ payload }) {
  try {
    const token = yield select((state) => state.user.user?.token);
    yield call(
      [customFetch, customFetch.patch],
      `/jobs/${payload.jobId}`,
      payload.jobData,
      authHeader(token)
    );
    yield put(editJobSuccess());
    yield put(clearValues());
    yield call(toast.success, 'Job Updated');
  } catch (error) {
    if (error?.response?.status === 401) {
      yield put(logoutuser());
    }
    const message = getErrorMessage(error, 'unable to update job');
    yield put(editJobFailure(message));
    yield call(toast.error, message);
  }
}

export default function* jobSaga() {
  yield takeLatest(createjobRequest.type, createJobWorker);
  yield takeLatest(editJobRequest.type, editJobWorker);
}
