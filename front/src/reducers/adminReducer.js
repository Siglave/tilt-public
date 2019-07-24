import {
    types
} from "../actions/types";

const initialState = {
    stats : {
        postsByDay:[],
        downvotePosts: []
    }
}

export default function (state = initialState, action) {
    switch (action.type) {
        case types.SET_STATS:        
            return{
                ...state,
                stats: action.payload.stats
            }
        case types.REMOVE_POST:
            var posts = [];
            posts = state.stats.downvotePosts.filter((post)=>{
                if(post._id !== action.payload.postId){
                    return post;
                }
            })
            return{
                stats: {
                    ...state.stats,
                    downvotePosts: posts
                }
            }
        default:
            return state;
    }
}