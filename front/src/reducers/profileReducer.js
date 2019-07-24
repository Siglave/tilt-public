import {
    types
} from "../actions/types";

const initialState = {
    user : {
        posts:[]
    },
    follows: [],
    followers: [],
    isFetching: false,
    fetchingError:false,
    fetchingFollows: false,
    fetchingFollowers: false
}

export default function (state = initialState, action) {
    var posts = [];
    switch (action.type) {
        case types.REQUEST_PROFILE:
            return{
                ...state,
                isFetching: true,
                fetchingError: false
            }
        case types.REQUEST_FOLLOWS:
            return{
                ...state,
                fetchingFollows: true,
                fetchingError: false
            }
        case types.REQUEST_FOLLOWERS:
            return{
                ...state,
                fetchingFollowers: true,
                fetchingError: false
            }
        case types.SET_FOLLOWS:
            return{
                ...state,
                follows: action.payload.follows,
                fetchingFollows: false
            }
        case types.SET_FOLLOWERS:
            return{
                ...state,
                followers: action.payload.followers,
                fetchingFollowers: false
            }
        case types.SET_PROFILE:
            return{
                ...state,
                user: action.payload.user,
                isFetching: false
            }
        case types.PROFILE_NOT_FOUND:
            return{
                ...state,
                fetchingError: true
            }
        case types.SET_REPLIES_POST:
            posts = [...state.user.posts];
            posts = posts.map((post)=>{
                if(post._id === action.payload.postId){
                    post.replies = action.payload.replies
                }
                return post;
            })
            return{
                ...state,
                user: {
                    ...state.user,
                    posts: posts
                },
            }
        case types.SET_VOTE:
            posts = [...state.user.posts];
            posts = posts.map((p)=>{
                if(p._id === action.payload.post._id){
                    p.vote = action.payload.post.vote;
                }
                return p;
            })
            return{
                ...state,
                user:{
                    ...state.user,
                    posts: posts
                }
            }
        case types.REPLACE_POST:
            posts = [...state.user.posts];
            posts = posts.map((p)=>{
                if(p._id === action.payload.post._id){
                    p = {...action.payload.post};
                }
                return p;
            })
            return{
                ...state,
                user:{
                    ...state.user,
                    posts: posts
                }
            }
        default:
            return state;
    }
}