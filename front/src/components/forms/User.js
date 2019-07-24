import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import * as userActions from '../../actions/userActions';
import { Row, Col, Input, Textarea, FormItem, ErrorInline } from '../styledComponents';
import DynamicSubmitButton from '../DynamicSubmitButton';

const FormStyle = styled.form`
    margin: 48px 5%;
`
const TitleForm = styled.h1`
    display: initial;
    font-size: 20px;
    border-bottom: 2px solid ${(props)=>props.theme.secondary3};
`;

const SubTitleText = styled.p`
    color: ${(props)=>props.theme.grey4};
`

class User extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pseudo: this.props.user.pseudo,
            email: this.props.user.email,
            description: this.props.user.description,
            submitState: 'still',
            loading:false,
            errors: {}
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
        var user ={
            pseudo: this.state.pseudo,
            email: this.state.email,
            description: this.state.description,
        }
        this.setState({loading: true});
        this.props.updateUser(user)
        .then((resp)=>{
            this.setState({
                loading: false,
                submitState: 'success',
            });
        })
        .catch((err)=>{
            this.setState({
                loading: false,
                submitState: 'error',
                errors: { ...this.state.errors, ...err.response.data.errors }
            });
            
        })

    }
    render() {
        const { errors } = this.state;
        return (
            <FormStyle onSubmit={this.handleSubmit}>
                <Row style={{background: 'white', borderRadius: '4px', padding: '32px'}}>
                    <Col style={{flexBasis: '30%', marginRight: '5%'}}>
                        <TitleForm>Informations utilisateur</TitleForm>
                        <SubTitleText style={{marginTop: '24px'}}>Enregistre une description pour permettre aux utilisateurs de mieux te connaitre !</SubTitleText>
                    </Col>
                    <Col style={{flexBasis: '65%'}}>
                        <div style={{display: 'flex', flexWrap: 'wrap'}}>
                            <Row style={{marginRight: '32px'}}>
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
                        </div>
                        <Row>
                            <Col>
                                <FormItem>
                                    <label>Description</label>
                                    <Textarea rows='5' onChange={this.handleChange} type='text' name='description' value={this.state.description} />
                                    {errors.description && (
                                        <ErrorInline>
                                            <small>{errors.description.message}</small>
                                        </ErrorInline>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <div style={{ marginTop: '24px' }}>
                    <DynamicSubmitButton loading={this.state.loading} text={'Modifier'} submitState={this.state.submitState} />
                </div>
            </FormStyle>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(
		{
			updateUser: userActions.updateUser,
		},
		dispatch
	);
};

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(User);
