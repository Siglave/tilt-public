import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {Input, Row, Col, FormItem, Textarea, ErrorInline} from '../styledComponents';
import DynamicSubmitButton from '../DynamicSubmitButton';

import * as postActions from '../../actions/postActions';


class Post extends Component {
    constructor(props){
        super(props);
        
        if(this.props.create){
            this.state = {
                message: '',
                tags:'',
                submitState: 'still',
                loading: false,
                errors:{}
            }
        }else{
            this.state = {
                message: this.props.postToModify.message,
                tags: this.props.postToModify.tags.join(),
                submitState: 'still',
                loading: false,
                errors:{}
            }
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
        var tags = this.state.tags.trim();
        if(tags === ''){
            tags = [];
        }else{
            tags = tags.split(',');
        }
        var postToSend = {
            message: this.state.message.trim(),
            tags: tags
        }
        this.setState({loading: true});

        if(this.props.create){

            this.props.createPost(postToSend)
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
        }else{
            postToSend._id = this.props.postToModify._id;
            this.props.updatePost(postToSend)
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
       
    }
    render() {
        const {errors} = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <Row>
                    <Col>
                        <FormItem>
                            <label>Post</label>
                            <Textarea rows='5' onChange={this.handleChange} type='text' name='message' value={this.state.message} />
                            {errors.message && (
                                <ErrorInline>
                                    <small>{errors.message.message}</small>
                                </ErrorInline>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormItem>
                            <label>Tags</label>
                            <Input onChange={this.handleChange} type='text' name='tags' value={this.state.tags} />
                            {errors.tags && (
                                <ErrorInline>
                                    <small>{errors.tags.message}</small>
                                </ErrorInline>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <div style={{marginTop: '24px'}}>
                    <DynamicSubmitButton loading={this.state.loading} text={this.props.create ? 'Créer' : 'Modifier'} submitState={this.state.submitState}/>
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
            createPost: postActions.createPost,
            updatePost: postActions.updatePost
		},
		dispatch
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);

