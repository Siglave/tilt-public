import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Row, Col, Textarea } from '../styledComponents';
import DynamicSubmitButton from '../DynamicSubmitButton';

import * as postActions from '../../actions/postActions';

class Reply extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '',
            tags: '',
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

        var reply = {
            message: this.state.message
        } 
        this.setState({ loading: true });
        this.props.createReply({ reply: reply, postId: this.props.post._id })
            .then((resp) => {
                this.setState({
                    loading: false,
                    submitState: 'success',
                },()=>{
                    this.props.fetchReplies(this.props.post._id)
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
                    <DynamicSubmitButton small={true} loading={this.state.loading} text={'Répondre'} submitState={this.state.submitState} />
                </div>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        postsState: state.post.posts
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            createReply: postActions.createReply,
            fetchReplies: postActions.fetchReplies
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Reply);


