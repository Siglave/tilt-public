import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { Row, Col, Icon} from '../components/styledComponents';
import Layout from '../components/Layout';
import MessageForm from '../components/forms/Message';
import Messages from '../components/Messages';
import { faComments } from '@fortawesome/free-solid-svg-icons';

import * as discussionActions from '../actions/discussionActions';


const DiscussionsListBlock = styled.div`
    
    margin-right: 48px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    border-radius: 2px;
    border-left: 2px solid ${(props)=>props.theme.primary3};
    @media (max-width: 800px) {
		display:flex;
	}
`
const DiscussionItem = styled.div`
    background: ${(props)=>props.theme.white};
    padding: 24px;
    cursor: pointer;
    transition: 0.6s;
    :hover{
        background: ${(props)=>props.theme.primary1};   
    }
`
const DiscussionsSelectedBlock = styled.div`
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    background: ${(props)=>props.theme.white};
    border-radius: 2px;
    padding: 48px 32px; 
`
const ColScroll = styled(Col)`
    @media (max-width: 800px) {
        overflow: scroll;
        margin: 0px 8px 24px 8px;
    }
`
const TitleNoDiscussion = styled.h1`
    font-size: 24px;
    @media (max-width: 800px) {
        font-size: 18px;
    }
`

class Discussion extends Component {

    constructor(props){
        super(props);
        this.state = {
            discussionSelected: false
        }
    }

    componentDidMount(){
        this.props.fetchDiscussions()
            .then(()=>{        
                if(this.props.match.params.id === 'new' && this.props.discussion._id === 'new'){
                    this.setState({discussionSelected: true})
                }else{
                    if(this.props.match.params.id === 'all'){
                        this.setState({discussionSelected: false})
                    }else{
                        var discussion = this.props.discussions.find((el)=>{return el._id === this.props.match.params.id});
                        if(discussion !== undefined){
                            this.props.setDiscussion(discussion);
                            this.setState({discussionSelected: true})
                        }
                        
                    }
                }
                    
            });

        
    }

    render() {
        return (
            <Layout>
                 <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Row style={{width: '100%', margin: '48px 2%'}}>
                        <ColScroll>
                            <DiscussionsListBlock>

                                {this.props.discussions.map((discussion)=>{
                                    return(
                                        <DiscussionItem 
                                        key={discussion._id}
                                        onClick={()=>{
                                            this.props.history.push('/discussions/'+discussion._id)
                                        }}
                                        >
                                            {discussion.users[0].pseudo} <Icon style={{color: '#858C9C'}}  left='true' right='true' icon={faComments}/> {discussion.users[1].pseudo}
                                        </DiscussionItem>
                                    )
                                })}
                            </DiscussionsListBlock>
                        </ColScroll>
                        <Col flexGrow={4} style={{margin: '0px 8px'}}>
                            <DiscussionsSelectedBlock>
                                {this.state.discussionSelected ? (
                                    <div>
                                        <div style={{marginBottom: '32px'}}>
                                            <h1 style={{fontSize: '24px'}}>{this.props.discussion.users[0].pseudo} <Icon style={{color: '#858C9C'}}  left='true' right='true' icon={faComments}/> {this.props.discussion.users[1].pseudo}</h1>
                                        </div>
                                        <div>
                                            <MessageForm/>
                                        </div>
                                        <Messages messages={this.props.discussion.messages} connectedUserId={this.props.user._id}/>
                                    </div>
                                ):(
                                    <div>
                                        <TitleNoDiscussion>Selectionne une discussion</TitleNoDiscussion>
                                    </div>
                                )}
                            </DiscussionsSelectedBlock>
                        </Col>
                    </Row>
                </div>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
	return {
        discussion: state.user.discussion,
        discussions: state.user.discussions,
        user: state.user.user
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(
		{
            fetchDiscussions: discussionActions.fetchDiscussions,
            setDiscussion: discussionActions.setDiscussion
		},
		dispatch
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Discussion);
