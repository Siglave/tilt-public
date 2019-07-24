import {
    types
} from "../actions/types";

import * as utils from "../utils";

const initialState = {
    userLogIn : utils.isAuthenticated(),
    showBannerSession: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case types.SET_AUTH_USER:
            utils.setToken(action.payload.token);                                        
            return {
                ...state,
                userLogIn : utils.isAuthenticated(),
            };
        case types.LOGOUT_USER:        
            utils.removeToken();          
            return {
                ...state,
                userLogIn : utils.isAuthenticated(),
            };
        case types.USER_TOKEN_EXPIRED:
            utils.removeToken();          
            return {
                ...state,
                userLogIn : utils.isAuthenticated(),
                showBannerSession: true
            };
        case types.HIDE_BANNER_SESSION:
            return{
                ...state,
                showBannerSession: false
            }
        default:
            return state;
    }
}