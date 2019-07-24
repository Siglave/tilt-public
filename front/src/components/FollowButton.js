import React, { Component } from 'react';
import styled from 'styled-components'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as userActions from '../actions/userActions';

const FollowButtonStyle = styled.button`
    display: flex;
	justify-content: center;
	align-items: center;
    transition: all 0.6s;
	border-radius: 25px;
	font-weight: 500;
    padding: 1px 12px;
    font-size: 10px;
	cursor: pointer;
    ${(props)=>( 
		props.unfollow ? `
		border: 1px solid ${props.theme.grey3};
		color: ${props.theme.grey3};
		background-color: ${props.theme.white}
		:hover {
            background-color: ${props.theme.red3};
            color: ${props.theme.white};
            border: 1px solid ${props.theme.red3};
		}
        ` :`
        border: 1px solid ${props.theme.secondary4};
        color: ${props.theme.secondary4};
        background-color: ${props.theme.white};
        :hover {
            background-color: ${props.theme.secondary4};
            color: ${props.theme.white};
        }
        `
	)}
` 

class FollowButton extends Component {

    render() {
        if(this.props.userToFollowId !== this.props.user._id){
            if(this.props.user.follows.includes(this.props.userToFollowId)){
                return (
                    <FollowButtonStyle unfollow onClick={()=>{
                            this.props.unfollow(this.props.userToFollowId);
                        }} 
                        style={{marginLeft: '16px'}}>
                        unfollow
                    </FollowButtonStyle>
                );
            }else{

                return (
                    <FollowButtonStyle onClick={()=>{
                            this.props.follow(this.props.userToFollowId);
                        }} 
                        style={{marginLeft: '16px'}}>
                        follow
                    </FollowButtonStyle>
                );
            }   
        }else{
            return null;
        }
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            follow: userActions.follow,
            unfollow: userActions.unfollow
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(FollowButton);

