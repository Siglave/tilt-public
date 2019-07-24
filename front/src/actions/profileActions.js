import axios from 'axios';
import { types } from './types';

import * as utils from '../utils';

export function fetchProfile(payload) {
	return function(dispatch) {
		dispatch({
			type: types.REQUEST_PROFILE,
		});
		return utils
			.checkValidAccessToken(() => {
				return axios.get(utils.urlApi+`/api/v1/user/${payload.pseudo}`, {
					headers: { 'x-access-token': utils.getToken() }
				});
			}, dispatch)
			.then((response) => {
				dispatch({
					type: types.SET_PROFILE,
					payload: response.data
				});
			})
			.catch((err) => {
				if(err.response.data.status === 404){
					dispatch({
						type: types.PROFILE_NOT_FOUND,
					});
				}
			});
	};
}
export function fetchFollows(userId) {
	return function(dispatch) {
		dispatch({
			type: types.REQUEST_FOLLOWS,
		});
		return utils
			.checkValidAccessToken(() => {
				return axios.get(utils.urlApi+`/api/v1/user/${userId}/follows`, {
					headers: { 'x-access-token': utils.getToken() }
				});
			}, dispatch)
			.then((response) => {
				dispatch({
					type: types.SET_FOLLOWS,
					payload: response.data
				});
			})
	};
}
export function fetchFollowers(userId) {
	return function(dispatch) {
		dispatch({
			type: types.REQUEST_FOLLOWERS,
		});
		return utils
			.checkValidAccessToken(() => {
				return axios.get(utils.urlApi+`/api/v1/user/${userId}/followers`, {
					headers: { 'x-access-token': utils.getToken() }
				});
			}, dispatch)
			.then((response) => {
				dispatch({
					type: types.SET_FOLLOWERS,
					payload: response.data
				});
			})
	};
}
