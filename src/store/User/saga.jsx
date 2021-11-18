import { fork, put, all, takeLatest,select } from "redux-saga/effects";
import { push } from "connected-react-router";
import axios from "../../config/axios";
import { GET_USERS_LIST, DELETE_USER } from "./constant";
import {
  getUsersListSuccess,
  getUsersList,
  changeUserActivePage,
} from "./actions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sagaErrorHandler } from "../sagaErrorHandler";
import { makeSelectAuthToken } from "../selectors";

function* fetchUsers({ payload }) {
  try {
    const token = yield select(makeSelectAuthToken());
    console.log("token in fetch user api",token)
    const headers = { headers: { Authorization: `Bearer ${token}`}};
    const response = yield axios.get(`/admin/users?page=${payload.page}`,headers);
    if (response.data.data.users.length == 0) {
      yield put(changeUserActivePage(response.data.totalPages));
    }
    yield put(getUsersListSuccess(response.data));
  } catch (error) {
    yield sagaErrorHandler(error.response);
  }
}

function* deleteUser({ payload }) {
  try {
    const token = yield select(makeSelectAuthToken());
    const headers = { headers: { Authorization: `Bearer ${token}`}};
    const response = yield axios.delete(`/admin/users/${payload.id}`,headers);
    toast.success(response.data.message);
    yield put(getUsersList({ page: payload.page }));
  } catch (error) {
    yield sagaErrorHandler(error.response);
  }
}

export function* watchFetchUsers() {
  yield takeLatest(GET_USERS_LIST, fetchUsers);
}

export function* watchDeleteUser() {
  yield takeLatest(DELETE_USER, deleteUser);
}

export default function* UserSaga() {
  yield all([fork(watchFetchUsers), fork(watchDeleteUser)]);
}
