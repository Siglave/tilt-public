import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
	FormItem,
	Input,
	ErrorInline
} from '../components/styledComponents';
import * as authActions from '../actions/authActions';
import styled from 'styled-components';
import DynamicSubmitButton from '../components/DynamicSubmitButton';

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

class ChangePassword extends Component {
    constructor(props){
        super(props);        
        this.state = {
            password : "",
            confirmPassword : "",
            submitState: 'still',
            loading : false,
            errors:{}
        }
    }

    handleChange = (e) =>{
        e.preventDefault();
        this.setState({
			[e.target.name]: e.target.value,
			errors: {...this.state.errors, [e.target.name] : '', }
		});
    }
    handleSubmit=(e)=>{
        e.preventDefault();        
        this.setState({
			errors: {},
			loading: true
        });
        if(this.state.password === this.state.confirmPassword){

            this.props
			.changePassword(this.state.password, this.props.match.params.token)
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
        }else{
            this.setState({
                errors: {
                    confirmPassword:{
                        message: "Les mots de passe doivent être identiques"
                    }
                },
                loading: false,
                submitState: 'error'
            });
        }

    }
    render() {
        return (
            <PageStyle>
                <Card>
                    <Title>Changement de mot de passe</Title>
                    <form onSubmit={this.handleSubmit}>
                        <FormItem>
                            <label>Nouveau mot de passe</label>
                            <Input 
                                onChange={this.handleChange}
                                name="password"
                                type="password"
                                placeholder="mot de passe"
                            />
                        </FormItem>
                        <FormItem>
                            <label>Confirmation mot de passe</label>
                            <Input 
                                onChange={this.handleChange}
                                name="confirmPassword"
                                type="password"
                                placeholder="mot de passe"
                            />
                            {this.state.errors.confirmPassword && (
                                <ErrorInline>
                                    <small>{this.state.errors.confirmPassword.message}</small>
                                </ErrorInline>
                            )}
                        </FormItem>
                        {this.state.errors.form && (
                                <ErrorInline style={{marginRight:"32px"}}>
                                    <small>{this.state.errors.form.message}</small>
                                </ErrorInline>
                            )}
                        <div style={{ display: 'flex', margin: '24px 0px 0px 0px',flexWrap:"wrap" }}>
                            <DynamicSubmitButton  loading={this.state.loading} text={'Envoyer'} submitState={this.state.submitState} />
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
			changePassword: authActions.changePassword
		},
		dispatch
	);
};
export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);


