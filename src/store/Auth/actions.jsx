import { LOGIN, LOGIN_SUCCESS } from './constant';

export const loginUser = (data) => {
    return {
        type: LOGIN,
        payload: data
    };
};

export const loginSuccess = (data) => {
    return {
        type: LOGIN_SUCCESS,
        payload: data
    };
};
