import {
    types
} from "../actions/types";

const initialState = {
    posts : [],
    fetchingReplies: false,
    showModal: false,
    createPost: false,
    postToModify: {}
}

export default function (state = initialState, action) {
    var posts = [];
    switch (action.type) {
        case types.SET_POSTS:
            return{
                ...state,
                posts: action.payload.posts
            }
        case types.ADD_POST:
            posts = [...state.posts];
            posts.unshift(action.payload.post);
            return{
                ...state,
                posts: posts
            }
        case types.REQUEST_REPLIES:
            return{
                ...state,
                fetchingReplies: true
            }
        case types.SET_REPLIES_POST:
            posts = [...state.posts];
            posts = posts.map((post)=>{
                if(post._id === action.payload.postId){
                    post.replies = action.payload.replies
                }
                return post;
            })
            return{
                ...state,
                posts: posts,
                fetchingReplies: false
            }
        case types.SET_VOTE:
            posts = [...state.posts];
            posts = posts.map((p)=>{
                if(p._id === action.payload.post._id){
                    p.vote = action.payload.post.vote;
                }
                return p;
            })
            return{
                ...state,
                posts: posts
            }
        case types.SHOW_MODAL_POST:
            return{
                ...state,
                showModal: true,
                createPost: action.payload.createPost,
                postToModify: action.payload.postToModify
            }
        case types.HIDE_MODAL_POST:
            return{
                ...state,
                showModal: false,
            }
        case types.REPLACE_POST:
            posts = [...state.posts];
            posts = posts.map((p)=>{
                if(p._id === action.payload.post._id){
                    p = {...action.payload.post};
                }
                return p;
            })
            return{
                ...state,
                posts: posts
            }
        default:
            return state;
    }
}