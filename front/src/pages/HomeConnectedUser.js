import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Layout from '../components/Layout';
import styled from 'styled-components';
import Thread from '../components/Thread';

import * as postAction from '../actions/postActions';


const RoundBtn = styled.button`
    border-radius: 50px;
    font-size: 32px;
    position: fixed;
    bottom: 30px;
    width: 46px;
    height: 46px;
    border: 0px solid;
    background: ${(props)=>props.theme.primary4};
    cursor:pointer;
    color: white;
    :hover{
        background: ${(props)=>props.theme.primary5};
    }
`

const HomeConnectedUser = ({showModalPost}) => {
    return (
        <Layout style={{position: 'relative'}}>
            <div>
                <Thread/>
                <div style={{display: 'flex', justifyContent :'center'}}>
                    <RoundBtn onClick={()=>{showModalPost({createPost: true, postToModify:{}})}}>+</RoundBtn>
                </div>
            </div>
        </Layout>
    );
}

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            showModalPost: postAction.showModalPost
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeConnectedUser);
