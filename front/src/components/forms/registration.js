import React, { Component } from 'react';
import { Input, Row, Col, FormItem, ErrorInline } from '../../components/styledComponents';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DynamicSubmitButton from '../../components/DynamicSubmitButton';

import * as authActions from '../../actions/authActions';

class Registraion extends Component {
    constructor(props){
        super(props);
        this.state = {
            pseudo: '',
            email: '',
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
            email: this.state.email,
            password: this.state.password
        }
        this.props.register(user)
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
                            <label>Email</label>
                            <Input onChange={this.handleChange} type='text' name='email' value={this.state.email} />
                            {errors.email && (
                                <ErrorInline>
                                    <small>{errors.email.message}</small>
                                </ErrorInline>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormItem>
                            <label>Mot de passe</label>
                            <Input onChange={this.handleChange} type='password' name='password'value={this.state.password}/>
                            {errors.password && (
                                <ErrorInline>
                                    <small>{errors.password.message}</small>
                                </ErrorInline>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <div style={{marginTop: '24px'}}>
                    <DynamicSubmitButton text={'Inscription'} loading={this.state.loading} submitState={this.state.submitState} />
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
			register: authActions.register,
		},
		dispatch
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Registraion);
