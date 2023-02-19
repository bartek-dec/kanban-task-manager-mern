import axios from "axios";
import {getUserFromLocalStorage, removeUserFromLocalStorage} from "./localStorage";
import {setToken, setUser} from "../features/user/userSlice";
import {setShowAlert, setAlertText} from "../features/alert/alertSlice";

export const authFetch = axios.create({
    baseURL: '/api/v1',
});

authFetch.interceptors.request.use((config) => {
    const {token} = getUserFromLocalStorage();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const checkForUnAuthorizedError = (error, thunkAPI, modalCallBack) => {
    if (error.response.status === 401) {
        thunkAPI.dispatch(setShowAlert(true));
        thunkAPI.dispatch(setAlertText('Unauthorized! Logging out...'));
        setTimeout(() => {
            thunkAPI.dispatch(setUser(null));
            thunkAPI.dispatch(setToken(null));
            thunkAPI.dispatch(setShowAlert(false));
            thunkAPI.dispatch(setAlertText(''));
            if (modalCallBack) {
                thunkAPI.dispatch(modalCallBack());
            }
            removeUserFromLocalStorage();
        }, 2000);
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);
}