import { call, put, select, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import {
  loginUserFailure,
  loginUserRequest,
  loginUserSuccess,
  logoutuser,
  registerUserFailure,
  registerUserRequest,
  registerUserSuccess,
  updateuserFailure,
  updateuserRequest,
  updateuserSuccess,
} from '../features/user/userSlice';
import {
  loginUserRequest as loginUserApi,
  registerUserRequest as registerUserApi,
  updateUserRequest,
} from '../features/user/userThunk';

const getErrorMessage = (error, fallback) => error?.response?.data?.msg || fallback;

function* registerUserWorker({ payload }) {
  try {
    const data = yield call(registerUserApi, payload);
    yield put(registerUserSuccess(data));
    yield call(toast.success, `Hello There ${data.user.name}`);
  } catch (error) {
    const message = getErrorMessage(error, 'unable to register user');
    yield put(registerUserFailure(message));
    yield call(toast.error, message);
  }
}

function* loginUserWorker({ payload }) {
  try {
    const data = yield call(loginUserApi, payload);
    yield put(loginUserSuccess(data));
    yield call(toast.success, `Welcome Back ${data.user.name}`);
  } catch (error) {
    const message = getErrorMessage(error, 'unable to login user');
    yield put(loginUserFailure(message));
    yield call(toast.error, message);
  }
}

function* updateUserWorker({ payload }) {
  try {
    const token = yield select((state) => state.user.user?.token);
    const data = yield call(updateUserRequest, payload, token);
    yield put(updateuserSuccess(data));
    yield call(toast.success, `User data updated for ${data.user.name}`);
  } catch (error) {
    if (error?.response?.status === 401) {
      yield put(logoutuser());
    }
    const message = getErrorMessage(error, 'unable to update user');
    yield put(updateuserFailure(message));
    yield call(toast.error, message);
  }
}

export default function* userSaga() {
  yield takeLatest(registerUserRequest.type, registerUserWorker);
  yield takeLatest(loginUserRequest.type, loginUserWorker);
  yield takeLatest(updateuserRequest.type, updateUserWorker);
}
