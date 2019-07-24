import axios from 'axios';
import { types } from './types';

import * as utils from '../utils';


export function setDiscussion(discussion) {
    return {
        type: types.SET_DISCUSSION,
        payload: {discussion: discussion}
    }
}


export function addMessage(payload) {
	return function(dispatch) {       
		return utils
			.checkValidAccessToken(() => {
				return axios.post(utils.urlApi+`/api/v1/discussion/${payload.discussionId}/message`,{ message: payload.message}, {
					headers: { 'x-access-token': utils.getToken() }
				});
			}, dispatch)
			.then((response) => {
                dispatch({
					type: types.REPLACE_DISCUSSION,
					payload: response.data
				});
			})
	};
}

export function createDiscussion(payload) {
	return function(dispatch) {      
		return utils
			.checkValidAccessToken(() => {
				return axios.post(utils.urlApi+`/api/v1/discussion`,{ receiverId: payload.receiverId, message: payload.message}, {
					headers: { 'x-access-token': utils.getToken() }
				});
			}, dispatch)
			.then((response) => {
                dispatch({
					type: types.ADD_DISCUSSION,
					payload: response.data
				});
			})
	};
}
export function fetchDiscussions() {
	return function(dispatch) {    
		return utils
			.checkValidAccessToken(() => {
				return axios.get(utils.urlApi+`/api/v1/discussion`, {
					headers: { 'x-access-token': utils.getToken() }
				});
			}, dispatch)
			.then((response) => {
                dispatch({
					type: types.SET_DISCUSSIONS,
					payload: response.data
				});
			})
	};
}