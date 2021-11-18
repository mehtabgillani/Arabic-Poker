import { takeEvery, fork, put, all, call, takeLatest } from 'redux-saga/effects';
import { LOGIN } from './constant';
import { loginSuccess } from './actions';
import { push } from 'connected-react-router';
import axios from "../../config/axios"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sagaErrorHandler } from "../sagaErrorHandler";

function* loginUser({ payload }) {
   
    try {
        let data = {
            "email": payload.email,
            "password": payload.password
        }
        const response = yield axios.post(`/admin/auth/login`, data);
        localStorage.setItem('token', 'hjvabkjdansdhbajsnldkasbdjnaksdb')
        yield put(loginSuccess(response.data));
        toast.success("Login Successfully");
        yield put(push('/app_dashboard'));

    } catch (error) {
        yield sagaErrorHandler(error.response);
    }
}



export function* watchLogin() {
    yield takeLatest(LOGIN, loginUser);
}


export default function* authSaga() {
    yield all(
        [
            fork(watchLogin),
        ]
    );
}