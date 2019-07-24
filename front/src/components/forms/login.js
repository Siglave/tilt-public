import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import { Input, Row, Col, FormItem, ErrorInline } from '../../components/styledComponents';

import DynamicSubmitButton from '../../components/DynamicSubmitButton';

import * as authActions from '../../actions/authActions';

const ForgetPasswordLink = styled(Link)`
    color: ${(props)=>props.theme.grey4};
    font-size: 14px;
    :hover{
        border-bottom: 2px solid ${(props)=>props.theme.grey4};
    }
`

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            pseudo: '',
            password: '',
            loading: false,
            submitState: 'still',
            errors:{}
        }
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value,
				errors: {
					...this.state.errors,
					[e.target.name]: ''
				}
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({loading: true});
        var user = {
            pseudo: this.state.pseudo,
            password: this.state.password
        }
        this.props.login(user)
        .catch((err)=>{
            this.setState({
                loading: false,
                submitState: 'error',
                errors: { ...this.state.errors, ...err.response.data.errors }
            });
            
        })

    }
    render() {
        var {errors} = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <Row>
                    <Col>
                        <FormItem>
                            <label>Pseudo</label>
                            <Input onChange={this.handleChange} type='text' name='pseudo' value={this.state.pseudo} />
                            {errors.pseudo && (
                                <ErrorInline>
                                    <small>{errors.pseudo.message}</small>
                                </ErrorInline>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormItem>
                            <label>Mot de passe</label>
                            <Input onChange={this.handleChange} type='password' name='password' value={this.state.password} />
                            {errors.password && (
                                <ErrorInline>
                                    <small>{errors.password.message}</small>
                                </ErrorInline>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <div style={{marginTop: '8px'}}>
                    <ForgetPasswordLink to="/resetPassword" >Mot de passe oublié</ForgetPasswordLink>
                </div>
                <div style={{marginTop: '24px'}}>
                    <DynamicSubmitButton loading={this.state.loading} text={'Connexion'} submitState={this.state.submitState}/>
                </div>
            </form>
        );
    }
}


const mapStateToProps = (state) => {
	return {
		
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(
		{
			login: authActions.login,
		},
		dispatch
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
