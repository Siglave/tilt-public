import axios from "axios";
import {
    types
} from "./types";
import * as utils from '../utils';


export function fetchStats() {
	return function(dispatch) {
		return utils
			.checkValidAccessToken(() => {
				return axios.get(utils.urlApi+`/api/v1/admin/stats`, {
					headers: { 'x-access-token': utils.getToken() }
				});
			}, dispatch)
			.then((response) => {
				dispatch({
					type: types.SET_STATS,
					payload: response.data
				});
			})
	};
}
export function deletePost(postId) {
	return function(dispatch) {
		return utils
			.checkValidAccessToken(() => {
				return axios.delete(utils.urlApi+`/api/v1/post/${postId}`, {
					headers: { 'x-access-token': utils.getToken() }
				});
			}, dispatch)
			.then((response) => {
				dispatch({
					type: types.REMOVE_POST,
					payload: {
						postId: postId
					}
				})
			})
	};
}