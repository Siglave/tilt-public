import axios from 'axios';
import { types } from './types';

import * as utils from '../utils';

export function fetchLoginUser() {
	return function(dispatch) {
		return utils
			.checkValidAccessToken(() => {
				return axios.get(utils.urlApi+'/api/v1/user/me', {
					headers: { 'x-access-token': utils.getToken() }
				});
			}, dispatch)
			.then((response) => {
				dispatch({
					type: types.SET_USER,
					payload: response.data
				});
			})
	};
}
export function fetchUsers(filter) {
	return function(dispatch) {
		return utils
			.checkValidAccessToken(() => {
				return axios.get(utils.urlApi+`/api/v1/user?pseudo=${filter}`, {
					headers: { 'x-access-token': utils.getToken() }
				});
			}, dispatch)
			.then((response) => {
				dispatch({
					type: types.SET_USERS,
					payload: response.data
				});
			})
	};
}

export function removeUsers() {
	return {
		type: types.REMOVE_USERS
	}
}
export function updateUser(user) {
	return function(dispatch) {
		return utils
			.checkValidAccessToken(() => {
				return axios.put(utils.urlApi+'/api/v1/user',{user: user}, {
					headers: { 'x-access-token': utils.getToken() }
				});
			}, dispatch)
			.then((response) => {
				dispatch({
					type: types.SET_USER,
					payload: response.data
				});
			})
	};
}
export function follow(userToFollowId) {
	return function(dispatch) {
		return utils
			.checkValidAccessToken(() => {
				return axios.post(utils.urlApi+`/api/v1/user/follow/${userToFollowId}`,{}, {
					headers: { 'x-access-token': utils.getToken() }
				});
			}, dispatch)
			.then((response) => {
				dispatch({
					type: types.SET_USER,
					payload: response.data
				});
				
			})
	};
}
export function unfollow(userToUnfollowId) {
	return function(dispatch) {
		return utils
			.checkValidAccessToken(() => {
				return axios.post(utils.urlApi+`/api/v1/user/unfollow/${userToUnfollowId}`,{}, {
					headers: { 'x-access-token': utils.getToken() }
				});
			}, dispatch)
			.then((response) => {
				dispatch({
					type: types.SET_USER,
					payload: response.data
				});
			})
	};
}
