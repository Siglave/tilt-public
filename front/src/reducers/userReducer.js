import {
    types
} from "../actions/types";

const initialState = {
    user : {
        roles: []
    },
    discussions:[],
    discussion:{ _id: 'default'},
    users:[]
}

export default function (state = initialState, action) {
    switch (action.type) {
        case types.SET_AUTH_USER:
        case types.SET_USER:
            return {
                ...state,
                user : action.payload.user,
            };
        case types.LOGOUT_USER:
            return{
                ...state,
                user: {}
            }
        case types.SET_DISCUSSION:
            return{
                ...state,
                discussion: action.payload.discussion
            }
        case types.SET_DISCUSSIONS:
            return{
                ...state,
                discussions: action.payload.discussions
            }
        case types.ADD_DISCUSSION:
            var newDiscussion = {
                ...action.payload.discussion,
                users:[action.payload.discussion.users[0]._id, action.payload.discussion.users[1]._id]
            }
            return{
                ...state,
                user:{
                    ...state.user,
                    discussions:[ ...state.user.discussions, newDiscussion]
                },
                discussions: [...state.discussions, action.payload.discussion],
                discussion: action.payload.discussion

            }
        case types.CREATE_DISCUSSION:
            return{
                ...state,
                discussions: [...state.discussions, action.payload.discussion]
            }
        case types.REPLACE_DISCUSSION:

            var newArray = [...state.discussions].map((el)=>{
                if(el._id === action.payload.discussion){
                    return action.payload.discussion;
                }else{
                    return el;
                }
            })
            return{
                ...state,
                discussions: newArray,
                discussion: action.payload.discussion
            }
        case types.SET_USERS:
            return{
                ...state,
                users: action.payload.users
            }
        case types.REMOVE_USERS:
            return{
                ...state,
                users: []
            }
        case types.SET_VOTE:
            var user = {...state.user};
            user.votePosts = action.payload.votePosts;
            return{
                ...state,
                user: user
            }
        default:
            return state;
    }
}