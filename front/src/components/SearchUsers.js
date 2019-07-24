import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { UserName, TrophyIcon } from './styledComponents';

import * as userActions from '../actions/userActions';

const InputFilter = styled.input`
    margin: 0;
	padding: 0;
	list-style: none;
	display: inline-block;
	padding: 3px 6px;
	line-height: 1.5em;
	color: ${(props) => props.theme.grey5};
	background-color: ${(props) => props.theme.grey0};
	border: none;
    border-radius: 2px;
    width:100%;
	box-sizing: border-box;
	outline: none;
	transition: all 0.3s;
	font-size :14px;
	box-shadow: inset 0 2px 2px hsla(0, 0%, 0%, 0.1);
`

const ResultBlock = styled.ul`
    position: absolute;
    background: ${(props)=>props.theme.white};
    width: 100%;
    list-style-type: none;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    transform: translateY(-11px);
    z-index: 999;
`
class SearchUsers extends Component {
    constructor(props){
        super(props);
        this.state = {
            filter: ''
        }
    }
    componentDidMount(){
        this.props.removeUsers();
    }
    handleChange = (e)=>{
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        },()=>{
            if(this.state.filter === ''){
                this.props.removeUsers();
            }else{
                this.props.fetchUsers(this.state.filter)
            }
        })
    }
    render() {
        return (
            <div style={{position: 'relative'}}>
                <div>
                    <InputFilter placeholder='Recherche utilisateur' name='filter' onChange={this.handleChange} value={this.state.filter} />
                </div>
                <ResultBlock>
                    {this.props.users.map((user)=>{
                        return(
                            <li key={user._id}>
                                <UserName to={{ pathname: `/profile/${user.pseudo}` }}>
                                    {user.pseudo}
                                </UserName> <TrophyIcon style={{fontSize: '16px'}} icon={faTrophy} isactive='true' right='true'/>{user.vote}
                            </li>
                        );
                    })}
                </ResultBlock>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
	return {
        users: state.user.users,
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(
		{
            fetchUsers: userActions.fetchUsers,
            removeUsers: userActions.removeUsers
		},
		dispatch
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchUsers);