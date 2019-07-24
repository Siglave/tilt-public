import axios from 'axios';
import { types } from './types';

import * as utils from '../utils';

export function showModalPost(payload) {
	return {
		type: types.SHOW_MODAL_POST,
		payload: {
			createPost: payload.createPost,
			postToModify: payload.postToModify
		}
	}
}
export function hideModalPost() {
	return {
		type: types.HIDE_MODAL_POST,
	}
}


export function createPost(post) {
	return function(dispatch) {
		return utils
			.checkValidAccessToken(() => {
				return axios.post(utils.urlApi+'/api/v1/post',{ post: post}, {
					headers: { 'x-access-token': utils.getToken() }
				});
			}, dispatch)
			.then((response) => {
				dispatch({
					type: types.ADD_POST,
					payload: response.data
				});
			})
	};
}
export function updatePost(post) {
	return function(dispatch) {
		return utils
			.checkValidAccessToken(() => {
				return axios.put(utils.urlApi+`/api/v1/post/${post._id}`,{ message: post.message, tags: post.tags}, {
					headers: { 'x-access-token': utils.getToken() }
				});
			}, dispatch)
			.then((response) => {
				dispatch({
					type: types.REPLACE_POST,
					payload: response.data
				});
			})
	};
}
export function createReply(payload) {
	return function(dispatch) {
		return utils
			.checkValidAccessToken(() => {
				return axios.post(utils.urlApi+`/api/v1/post/${payload.postId}/reply`,{ reply: payload.reply}, {
					headers: { 'x-access-token': utils.getToken() }
				});
			}, dispatch)
	};
}
export function fetchReplies(postId) {
	return function(dispatch) {
		dispatch({
			type: types.REQUEST_REPLIES,
		});
		return utils
			.checkValidAccessToken(() => {
				return axios.get(utils.urlApi+`/api/v1/post/${postId}/replies`, {
					headers: { 'x-access-token': utils.getToken() }
				});
			}, dispatch)
			.then((response) => {
				dispatch({
					type: types.SET_REPLIES_POST,
					payload: {
						postId: postId,
						replies: response.data.replies
					}
				});
			})
	};
}

export function fetchPosts(filter, time) {
    return function (dispatch) {
        return axios.get(utils.urlApi+`/api/v1/post?filter=${filter}&time=${time}`)
            .then((response) => {
                dispatch({
                    type: types.SET_POSTS,
                    payload: response.data
                });
            })
    }

}

export function vote(payload) {
	return function(dispatch) {
		return utils
			.checkValidAccessToken(() => {
				return axios.post(utils.urlApi+`/api/v1/post/${payload.postId}/vote`,{ upvote: payload.upvote}, {
					headers: { 'x-access-token': utils.getToken() }
				});
			}, dispatch)
			.then((response) => {
				dispatch({
					type: types.SET_VOTE,
					payload: response.data
				});
			})
	};
}
