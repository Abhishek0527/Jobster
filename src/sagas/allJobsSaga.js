import { call, put, select, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import customFetch from '../utils/axios';
import {
  deleteJobFailure,
  deleteJobRequest,
  deleteJobSuccess,
  getAllJobsFailure,
  getAllJobsRequest,
  getAllJobsSuccess,
  showStatsFailure,
  showStatsRequest,
  showStatsSuccess,
} from '../features/allJobs/alljobsSlice';
import { logoutuser } from '../features/user/userSlice';

const authHeader = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const getErrorMessage = (error, fallback) => error?.response?.data?.msg || fallback;

function* getAllJobsWorker() {
  try {
    const token = yield select((state) => state.user.user?.token);
    const { page, search, searchStatus, searchType, sort } = yield select((state) => state.allJobs);

    const params = new URLSearchParams();
    params.set('page', page);
    if (search) params.set('search', search);
    if (searchStatus !== 'all') params.set('status', searchStatus);
    if (searchType !== 'all') params.set('jobType', searchType);
    if (sort) params.set('sort', sort);

    const response = yield call(
      [customFetch, customFetch.get],
      `/jobs?${params.toString()}`,
      authHeader(token)
    );
    yield put(getAllJobsSuccess(response.data));
  } catch (error) {
    if (error?.response?.status === 401) {
      yield put(logoutuser());
    }
    const message = getErrorMessage(error, 'unable to fetch jobs');
    yield put(getAllJobsFailure(message));
    yield call(toast.error, message);
  }
}

function* showStatsWorker() {
  try {
    const token = yield select((state) => state.user.user?.token);
    const response = yield call([customFetch, customFetch.get], '/jobs/stats', authHeader(token));
    yield put(showStatsSuccess(response.data));
  } catch (error) {
    if (error?.response?.status === 401) {
      yield put(logoutuser());
    }
    const message = getErrorMessage(error, 'unable to load stats');
    yield put(showStatsFailure(message));
    yield call(toast.error, message);
  }
}

function* deleteJobWorker({ payload }) {
  try {
    const token = yield select((state) => state.user.user?.token);
    yield call([customFetch, customFetch.delete], `/jobs/${payload}`, authHeader(token));
    yield put(deleteJobSuccess());
    yield put(getAllJobsRequest());
    yield put(showStatsRequest());
    yield call(toast.success, 'Job removed');
  } catch (error) {
    if (error?.response?.status === 401) {
      yield put(logoutuser());
    }
    const message = getErrorMessage(error, 'unable to delete job');
    yield put(deleteJobFailure(message));
    yield call(toast.error, message);
  }
}

export default function* allJobsSaga() {
  yield takeLatest(getAllJobsRequest.type, getAllJobsWorker);
  yield takeLatest(showStatsRequest.type, showStatsWorker);
  yield takeLatest(deleteJobRequest.type, deleteJobWorker);
}
