import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import Layout from '../components/Layout.js';
import { Row, Col, UserBlock, UserName, Button } from '../components/styledComponents';

import * as adminActions from '../actions/adminActions';

const StatBlock = styled.div` 
    padding: 24px 32px;
    background: ${(props) => props.theme.white};
    min-width: 200px;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    border-left: 2px solid ${(props) => props.theme.primary3};
    @media (max-width: 800px) {
        margin: 12px 0px;
        width: 300px;
	}
`
const NumberStat = styled.span`
    font-size: 32px;
    margin-right: 8px;
`
const Stat = styled.div`
    padding: 12px;
    margin: 8px;
    /* border: 1px solid ${(props) => props.theme.grey3}; */
`
const StatTitle = styled.h1`
    display: initial;
    font-size: 16px;
    border-bottom: 2px solid ${(props)=>props.theme.secondary3};
`
const PostBlock = styled.div`
    display: flex; 
    align-items:center; 
    justify-content:space-between;
    padding: 24px 0px;
    width: 100%;
`
const PagePadding = styled.div`
    padding: 48px 128px;
    @media (max-width: 800px) {
        padding: 48px 6px;
	}
`
const RowStatNumber = styled(Row)`
    justify-content: start;
    @media (max-width: 800px) {
        justify-content: center;
    }
`
const ModerationBlock = styled(StatBlock)`
    width: 100%; 
    padding: 32px 46px; 
    justify-content: start; 
    @media (max-width: 800px) {
        padding: 12px;
        width: 100%;
    }
`

class Admin extends Component {
    componentDidMount() {
        this.props.fetchStats();
    }
    render() {
        return (
            <Layout>
                <PagePadding>
                    <Row >
                        <Col>
                            <RowStatNumber style={{ marginBottom: '24px' }}>
                                <div>
                                    <StatBlock style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <NumberStat>{this.props.stats.totalUsers}</NumberStat> utilisateurs
                                </StatBlock>
                                </div>
                            </RowStatNumber>
                            <RowStatNumber>
                                <div>
                                    <StatBlock style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <NumberStat>{this.props.stats.totalPosts}</NumberStat> posts
                                    </StatBlock>
                                </div>
                            </RowStatNumber>
                        </Col>
                        <Col>
                            <StatBlock>
                                <div style={{ marginBottom: '24px' }}>
                                    <StatTitle>Nombre de posts par jours</StatTitle>
                                </div>
                                <div style={{ display: 'flex', overflow: 'scroll' }}>
                                    {this.props.stats.postsByDay.reverse().map((stat, i) => {
                                        return (
                                            <Stat  key={i}>
                                                <div>{stat._id.day}/{stat._id.month}/{stat._id.year}</div>
                                                <div style={{display: 'flex', justifyContent: 'center', marginTop: '12px'}}>
                                                    <p>
                                                        <b style={{fontSize: '18px'}}>{stat.documentCount}</b> <small>posts</small>
                                                    </p>
                                                </div>
                                            </Stat>
                                        );
                                    })}
                                </div>
                            </StatBlock>
                        </Col>
                    </Row>
                    <Row style={{ margin: '32px 0px' }}>
                        <ModerationBlock>
                            <div>
                                <StatTitle>Moderation</StatTitle>
                            </div>
                            <div style={{ width: '100%' }}>
                                {this.props.stats.downvotePosts.map((post) => {
                                    return (
                                        <PostBlock key={post._id}>
                                            <div style={{ flexBasis: '20%' }}>
                                                <NumberStat>{post.vote}</NumberStat>
                                            </div>
                                            <div style={{ flexBasis: '60%' }}>
                                                <UserBlock>
                                                    <UserName
                                                        to={{ pathname: `/profile/${post.creator.pseudo}` }}
                                                    >{post.creator.pseudo}</UserName>
                                                </UserBlock>
                                                <div>
                                                    {post.message}
                                                </div>
                                            </div>
                                            <div style={{ flexBasis: '20%' }}>
                                                <Button style={{padding: '4px 12px'}} delete onClick={() => { this.props.deletePost(post._id) }}>Supprimer</Button>
                                            </div>
                                        </PostBlock>
                                    );
                                })}
                            </div>
                        </ModerationBlock>
                    </Row>
                </PagePadding>
            </Layout>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        stats: state.admin.stats
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            fetchStats: adminActions.fetchStats,
            deletePost: adminActions.deletePost
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);