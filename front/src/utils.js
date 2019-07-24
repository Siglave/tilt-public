import { types } from './actions/types';

export var urlApi = 'http://localhost:3001';

export function setToken(token) {
	if (!localStorage.getItem('token')) {
		localStorage.setItem('token', JSON.stringify(token));
	}
}

export function removeToken() {
	localStorage.removeItem('token');
}

export function getToken() {
	return JSON.parse(localStorage.getItem('token'));
}
export function isAuthenticated() {
	if (localStorage.getItem('token')) {
		return true;
	}
	return false;
}


export function checkValidAccessToken(reqFunction, dispatch) {
	return new Promise((resolve, reject) => {
		reqFunction()
			.then((response) => {
				resolve(response);
			})
			.catch((error) => {
				if (error.response.data.name === 'TokenExpiredError' || error.response.data.name === 'JsonWebTokenError' ) {
					//Dispatch to inform user
					dispatch({
						type: types.USER_TOKEN_EXPIRED
					});
				} 	
				reject(error);
				
			});
	});
}

