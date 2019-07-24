import React, {useState} from 'react';
import styled from 'styled-components'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { faMinusSquare } from '@fortawesome/free-regular-svg-icons';
import { faTrophy, faComment, faEdit } from '@fortawesome/free-solid-svg-icons';

import {Icon, TrophyIcon, UserName, UserBlock, DateP} from './styledComponents';


import * as postActions from '../actions/postActions';
import PostReplies from './PostReplies';

import FollowButton from './FollowButton';



const PostStyle = styled.div`
    border-left: 2px solid  ${(props)=>props.theme.primary2}; ; 
    width: 520px; 
    background: white;
    padding: 24px 36px 8px 24px;
    border-radius: 4px 4px 0px 0px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    @media (max-width: 800px) {
		width: 300px
	}
`
const Tag = styled.div`
    border: 1px solid ${(props)=>props.theme.grey2}; 
    border-radius: 4px;
    color: ${(props)=>props.theme.grey2};
    padding: 2px 8px;
    font-size: 12px;
    margin-right: 16px;
`

const VoteBlock = styled.div`
    display:flex;
    justify-content: center;
    align-items:center;
    padding: 2px;
`

const MinusIcon = styled(Icon)`
    cursor:pointer;
    font-size: 24px;
    transition: 0.3s;
    ${(props)=>props.isactive === 'true'? (`
        color: ${props.theme.red2};
    `) : (`
        color: ${props.theme.grey2};
    `)}
    :hover{
        color: ${(props)=>props.theme.red2};
    }
`
const IconP = styled.p`
    cursor: pointer;
`;

const CommentIcon = styled(Icon)`
    cursor:pointer;
    transition: 0.3s;
    color: ${(props)=>props.theme.grey2};
    ${IconP}:hover &{
        color: ${(props)=>props.theme.primary4};
    }
`
const EditIcon = styled(Icon)`
    cursor:pointer;
    transition: 0.3s;
    color: ${(props)=>props.theme.grey2};
    ${IconP}:hover &{
        color: ${(props)=>props.theme.primary4};
    }
`


const Post = ({vote, post, votePosts, showModalPost, connectedUser}) => {
    const [showReplies, setShowReplies] = useState(false);

    var plusActive = false;
    var minusActive = false;

    var votePost = votePosts.find((v)=>{
        return v.post === post._id
    });

    if(votePost !== undefined){
        plusActive = votePost.upvote;
        minusActive = !votePost.upvote;
    }
    var creationDate = new Date(post.creationDate);
    var creationDateString = `${creationDate.getDate()}/${creationDate.getMonth()+1}/${creationDate.getFullYear()}`;
    
    return (
        <React.Fragment>    
            <PostStyle>
                <div style={{display: 'flex'}}>
                    <div style={{display: 'initial', marginRight: '18px', marginTop: '12px'}}>
                        <VoteBlock>
                            <TrophyIcon
                                icon={faTrophy}
                                inherit={'true'}
                                isactive={plusActive ? 'true' : 'false'}
                                onClick={()=>{
                                    vote({
                                        upvote: true,
                                        postId: post._id
                                    });
                                }}
                            />  
                        </VoteBlock>
                        <VoteBlock>{post.vote}</VoteBlock>
                        <VoteBlock>
                            <MinusIcon 
                                icon={faMinusSquare}
                                inherit={'true'}
                                isactive={minusActive? 'true' : 'false'}
                                onClick={()=>{
                                    vote({
                                        upvote: false,
                                        postId: post._id
                                    });
                                }}
                            />
                        </VoteBlock>
                    </div>
                    <div style={{width: '100%'}}>
                        <div style={{display:'flex', justifyContent: 'space-between'}}>
                            <UserBlock>
                                <UserName
                                    to={{ pathname: `/profile/${post.creator.pseudo}` }}
                                >{post.creator.pseudo}</UserName>
                                <FollowButton userToFollowId={post.creator._id} />
                            </UserBlock>
                            <div>
                                <DateP>{creationDateString}</DateP>
                            </div>
                        </div>
                        <div style={{marginTop:'12px', lineHeight:'1.4em', textAlign: 'justify'}}>
                            {post.message}
                        </div>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: "48px 0 16px"}}>
                            <div style={{display: 'flex'}}>
                                {post.tags.map((tag, i)=>{
                                    return(
                                        <Tag key={i}>{tag}</Tag>
                                        );
                                    })}
                            </div>
                            <div style={{display:'flex'}}>
                                {connectedUser._id === post.creator._id ? (
                                    <IconP>
                                        <EditIcon 
                                            right='true'
                                            icon={faEdit}
                                            onClick={()=>{
                                                showModalPost({
                                                    createPost: false,
                                                    postToModify: post
                                                })
                                            }}
                                            />
                                    </IconP>
                                ):null}
                                <IconP onClick={()=>{ setShowReplies(!showReplies)}}>
                                    <CommentIcon right='true' icon={faComment}/>{post.replies.length}
                                </IconP>
                            </div>
                        </div>
                    </div>
                </div>
            </PostStyle>
            {showReplies ? (
                <PostReplies post={post}/>
            ):null}
        </React.Fragment>
    );
}


const mapStateToProps = (state) => {
	return {
        connectedUser: state.user.user
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(
		{
            vote: postActions.vote,
            showModalPost: postActions.showModalPost
		},
		dispatch
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
