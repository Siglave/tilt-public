import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../actions/authActions';
import styled from 'styled-components';

import {Input, ErrorInline, FormItem} from '../components/styledComponents';
import DynamicSubmitButton from '../components/DynamicSubmitButton'

const PageStyle = styled.div`
    min-height: 100vh;
    background: ${(props)=> props.theme.grey0 };
    display:flex;
    justify-content: center;
    align-items: center;
`
const Card = styled.div`
    width: 400px;
    background: ${(props)=> props.theme.white };
    padding: 12px 24px;

`
const Title = styled.h1`
    font-size: 24px;
`

class ResetPassword extends Component {
    constructor(props) {
		super(props);

		this.state = {
			email: '',
			loading: false,
			submitState: 'still',
			errors: {}
		};
	}
	
	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
			errors: {}
		});
	}
	handleSubmit = (e) => {
		e.preventDefault();
		this.setState({
			errors: {},
			loading: true
		});
		this.props
			.sendMailResetPassword(this.state.email)
			.then((response) => {
				this.setState({ loading: false, submitState: 'success' });
			})
			.catch((err) => {
				this.setState({
					errors: { ...this.state.errors, ...err.response.data.errors },
                    loading: false,
                    submitState: 'error'
				});
			});
	}

	render() {
		return (
			<PageStyle>
                <Card>
                    <Title>Demande de nouveau mot de passe</Title>
                    <form onSubmit={this.handleSubmit}>
                        <FormItem>
                            <label>Email</label>
                            <Input
                                onChange={this.handleChange}
                                name="email"
                                type="text"
                                placeholder="mylostpassword@gmail.com"
                            />
                            {this.state.errors.email && (
                                <ErrorInline>
                                    <small>{this.state.errors.email.message}</small>
                                </ErrorInline>
                            )}
                        </FormItem>
                        <div style={{ display: 'flex', marginTop: '24px' }}>
                            <DynamicSubmitButton  loading={this.state.loading} text={'Envoyer'} submitState={this.state.submitState} />
                            {this.state.submitState === 'success' ? (
                                <span>Mail envoyé ! Verifiez vos spam</span>
                            ): null}
                        </div>
                    </form>
                </Card>
			</PageStyle>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(
		{
			sendMailResetPassword: authActions.sendMailResetPassword
		},
		dispatch
	);
};
export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);


