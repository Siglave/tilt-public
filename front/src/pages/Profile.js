import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { Row, Col, Loader, Button } from '../components/styledComponents';
import Layout from '../components/Layout';
import Post from '../components/Post';

import * as profileActions from '../actions/profileActions';
import * as discussionActions from '../actions/discussionActions';
import ProfileBlock from '../components/ProfileBlock';

const MenuBlock = styled.div`
    display: flex;
    border-bottom : 2px solid ${(props) => props.theme.primary2};
    padding:12px 0 8px;
`
const MenuLink = styled.span`
    display:block;
    margin-right: 12px;
    font-size: 18px;
    font-family: ${(props) => props.theme.fontFamilyTitle};
    cursor: pointer;
    ${(props) => (
        props.active === 'true' ? `
		    color: ${props.theme.grey6};
            ` : `
		    color: ${props.theme.grey2};
        `
    )}
`
const SendMessageButton = styled(Button)`
    padding: 4px 24px;
    color: ${(props) => props.theme.grey6};
    border-radius: 25px;
`
const InfoBlock = styled.div`
    min-width: 540px;
    @media (max-width: 800px) {
        min-width: 340px;
	}
`
const ColProfile = styled(Col)`
    margin-right: 32px;
    @media (max-width: 800px) {
        margin: 0px 8px
    }
`

const SendMessageBlock = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 36px;
    @media (max-width: 800px) {
        justify-content: center;
        margin: 24px 0px;
    }
`

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 'posts'
        }
    }

    componentDidMount() {
        this.props.fetchProfile({ pseudo: this.props.match.params.pseudo })
    }
    handleClickSendMessage = (e) => {
        e.preventDefault();
        var discussion = this.props.connectedUser.discussions.find((elem) => {
            return elem.users.includes(this.props.userProfile._id);
        });
        if (discussion !== undefined) {
            //Discussion already exist
            this.props.history.push('/discussions/' + discussion._id)
        } else {
            this.props.setDiscussion({
                _id: 'new',
                messages: [],
                users: [{...this.props.connectedUser}, {...this.props.userProfile}]
            });
            //Create new discussion
            this.props.history.push('/discussions/new')
        }

    }
    render() {
        const { userProfile, connectedUser, isFetching } = this.props;
 
        return (
            <Layout>

                {!this.props.fetchingError ? (
                    <React.Fragment>

                        {(!isFetching && userProfile.posts !== undefined) ? (
                             <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Row style={{ marginTop: '48px' }}>
                                <ColProfile>
                                    <ProfileBlock userProfile={userProfile} />
                                </ColProfile>
                                <Col flexGrow={2}>
                                    <SendMessageBlock>
                                        {connectedUser._id !== userProfile._id ? (
                                            <SendMessageButton secondary onClick={this.handleClickSendMessage}>Envoyer un message</SendMessageButton>
                                        ) : null}
                                    </SendMessageBlock>
                                    <div style={{ display: 'grid', justifyContent: 'center' }}>
                                        <MenuBlock>
                                            <MenuLink
                                                active={this.state.tab === 'posts' ? 'true' : 'false'}
                                                onClick={() => {
                                                    this.setState({ tab: 'posts' })
                                                }}
                                            >Posts</MenuLink>
                                            <MenuLink
                                                active={this.state.tab === 'follows' ? 'true' : 'false'}
                                                onClick={() => {
                                                    this.setState({ tab: 'follows' })
                                                    this.props.fetchFollows(userProfile._id);
                                                }}
                                            >Follows</MenuLink>
                                            <MenuLink
                                                active={this.state.tab === 'followers' ? 'true' : 'false'}
                                                onClick={() => {
                                                    this.setState({ tab: 'followers' })
                                                    this.props.fetchFollowers(userProfile._id);
                                                }}
                                            >Followers</MenuLink>
                                        </MenuBlock>
                                        <InfoBlock>
                                            {this.state.tab === 'posts' ? (
                                                <React.Fragment>
                                                    {userProfile.posts.map((post) => {
                                                        return (
                                                            <div key={post._id} style={{ margin: '32px 0' }} >
                                                                <Post post={post} votePosts={connectedUser.votePosts} />
                                                            </div>
                                                        )
                                                    })}
                                                </React.Fragment>
                                            ) : null}
                                            {this.state.tab === 'follows' ? (
                                                <React.Fragment>
                                                    {this.props.follows.map((follow) => {
                                                        return (
                                                            <div key={follow._id} style={{ margin: '32px 0' }} >
                                                                <ProfileBlock userProfile={follow} />
                                                            </div>
                                                        )
                                                    })}
                                                </React.Fragment>
                                            ) : null}
                                            {this.state.tab === 'followers' ? (
                                                <React.Fragment>
                                                    {this.props.followers.map((follower) => {
                                                        return (
                                                            <div key={follower._id} style={{ margin: '32px 0' }} >
                                                                <ProfileBlock userProfile={follower} />
                                                            </div>
                                                        )
                                                    })}
                                                </React.Fragment>
                                            ) : null}
                                        </InfoBlock>
                                    </div>
                                </Col>
                            </Row>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' ,minHeight: '100vh' }}>
                                <Loader />
                            </div>
                        )}
                    </React.Fragment>
                ) : (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' ,minHeight: '100vh' }}>
                            <h1><span role='img' aria-label=''>🕵️‍♂️</span> Utilisateur introuvable</h1>
                        </div>
                    )}
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userProfile: state.profile.user,
        isFetching: state.profile.isFetching,
        connectedUser: state.user.user,
        fetchingError: state.profile.fetchingError,
        fetchingFollows: state.profile.fetchingFollows,
        fetchingFollowers: state.profile.fetchingFollowers,
        follows: state.profile.follows,
        followers: state.profile.followers,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            fetchProfile: profileActions.fetchProfile,
            fetchFollows: profileActions.fetchFollows,
            fetchFollowers: profileActions.fetchFollowers,
            setDiscussion: discussionActions.setDiscussion
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
