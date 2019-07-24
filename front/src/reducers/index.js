import {
    combineReducers
} from "redux";

import auth from '../reducers/authReducer';
import user from '../reducers/userReducer';
import post from '../reducers/postReducer';
import profile from '../reducers/profileReducer';
import admin from '../reducers/adminReducer';

export default combineReducers({
    auth,
    user,
    post,
    profile,
    admin
});