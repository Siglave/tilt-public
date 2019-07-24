import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Row, Col, Textarea } from '../styledComponents';
import DynamicSubmitButton from '../DynamicSubmitButton';

import * as discussionActions from '../../actions/discussionActions';

class Message extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '',
            submitState: 'still',
            loading: false,
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

        var users = this.props.discussion.users;
        this.setState({ loading: true });
        
        if(this.props.discussion._id === 'new'){

            var receiverId = users.find((el)=>{return el._id !== this.props.connectedUser._id});
            this.props.createDiscussion({ message: this.state.message, receiverId: receiverId })
            .then((resp) => {
                this.setState({
                    loading: false,
                    submitState: 'success',
                });
            })
            .catch((err) => {
                this.setState({
                    loading: false,
                    submitState: 'error',
                    errors: { ...this.state.errors, ...err.response.data.errors }
                });
                
            })
        }else{
            this.props.addMessage({ message: this.state.message, discussionId: this.props.discussion._id })
            .then((resp) => {
                this.setState({
                    loading: false,
                    submitState: 'success',
                });
            })
            .catch((err) => {
                this.setState({
                    loading: false,
                    submitState: 'error',
                    errors: { ...this.state.errors, ...err.response.data.errors }
                });
                
            })
        }

    }
    render() {
        const { errors } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <Row>
                    <Col>
                        <Textarea rows='3' onChange={this.handleChange} type='text' name='message' value={this.state.message} />
                        {errors.message && (
                            <div>
                                <small>{errors.message.message}</small>
                            </div>
                        )}
                    </Col>
                </Row>
                <div style={{ marginTop: '8px' }}>
                    <DynamicSubmitButton small={true} loading={this.state.loading} text={'Envoyer'} submitState={this.state.submitState} />
                </div>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        discussion: state.user.discussion,
        connectedUser: state.user.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            createDiscussion: discussionActions.createDiscussion,
            addMessage: discussionActions.addMessage
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Message);


