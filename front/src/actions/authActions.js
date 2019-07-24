import axios from "axios";
import {
    types
} from "./types";
import * as utils from '../utils';

export function logout() {
	return {
		type: types.LOGOUT_USER
	}
}
export function hideBannerSession() {
	return {
		type: types.HIDE_BANNER_SESSION
	}
}

export function register(user) {
    return function (dispatch) {
        return axios.post(utils.urlApi+"/api/v1/register", {
                user: user
            })
            .then((response) => {
                dispatch({
                    type: types.SET_AUTH_USER,
                    payload: response.data
                });
            })
    }

}
export function login(user) {
    return function (dispatch) {
        return axios.post(utils.urlApi+"/api/v1/login", {
                user: user
            })
            .then((response) => {
                dispatch({
                    type: types.SET_AUTH_USER,
                    payload: response.data
                });
            })
    }

}
export function sendMailResetPassword(email){
    return function (dispatch) {
        return axios.post(utils.urlApi+"/api/v1/sendMailResetPassword", {
                email: email
            })
    }
}
export function changePassword(password, token) {
    return function (dispatch) {
        return axios.post(utils.urlApi+"/api/v1/changePassword", {
            password: password,
            token: token
        })
    }

}
