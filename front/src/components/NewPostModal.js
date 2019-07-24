import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from './Modal';
import PostForm from './forms/Post';
import * as postAction from '../actions/postActions';

const NewPostModal = ({showModal, createPost, postToModify, hideModalPost}) => {
    return (
        <Modal visible={showModal} onCancel={()=>{hideModalPost()}}>
            <div>
                <PostForm create={createPost} postToModify={postToModify}/>
            </div>
        </Modal>
    );
}

const mapStateToProps = (state) => {
    return {
        showModal: state.post.showModal,
        createPost: state.post.createPost,
        postToModify: state.post.postToModify
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            hideModalPost: postAction.hideModalPost,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPostModal);
