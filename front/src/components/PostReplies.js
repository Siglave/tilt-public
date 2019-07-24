import React, {Component} from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import ReplyForm from './forms/Reply';
import Reply from './Reply';
import * as postActions from '../actions/postActions';

const PostRepliesStyle = styled.div`
    border-left: 2px solid ${(props)=> props.theme.primary2};
    background: white;
    padding: 24px 36px 24px 24px;
    width: 520px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    @media (max-width: 800px) {
		width: 300px
	}
`



class PostReplies extends Component {
    componentDidMount(){
        this.props.fetchReplies(this.props.post._id);
    }
    render() {
        return (
            <PostRepliesStyle>
                <div>
                    <ReplyForm post={this.props.post}/>
                </div>
                <div>
                    {this.props.post.replies.map((reply,i)=>{ 
                        return(<Reply key={i} fetchingReplies={this.props.fetchingReplies} reply={reply}/>)
                    })}
                </div>
            
            </PostRepliesStyle>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        fetchingReplies: state.post.fetchingReplies
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            fetchReplies: postActions.fetchReplies
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(PostReplies);


