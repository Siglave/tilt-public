import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Select } from '../components/styledComponents';

import styled from 'styled-components';
import Post from './Post';
import * as postActions from '../actions/postActions';

const FilterBlock = styled.div`
    display: flex;
`


class Thread extends Component {
    constructor(props){
        super(props);
        this.state = {
            filter: 'new',
            time: 'week'
        }
    }

    componentDidMount(){
        this.props.fetchPosts(this.state.filter, this.state.time);
    }
    handleChangeFilter = (e)=>{
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        },()=>{
            this.props.fetchPosts(this.state.filter, this.state.time);
        })
    }


    render() {
        var {posts, user} = this.props;
        
        return (
            <div style={{display: 'grid', justifyContent :'center', marginTop: '48px'}}>
                <FilterBlock>
                    <Select
                        style={{marginRight: '12px'}}
                        name='filter'
                        onChange={this.handleChangeFilter}
                        value={this.state.filter}
                    >
                        <option value='new'>Nouveau</option>
                        <option value='top'>Top</option>
                    </Select>
                    {this.state.filter === 'top' ? (
                        <Select 
                            name='time'
                            onChange={this.handleChangeFilter}
                            value={this.state.time}
                        >
                            <option value='week'>Semaine</option>
                            <option value='month'>Mois</option>
                            <option value='all'>Depuis le début</option>
                        </Select>
                    ):null}
                </FilterBlock>
                <div style={{marginTop: '16px'}}>
                    {posts.map((post)=>{
                        return(
                            <div key={post._id} style={{margin: '32px 0'}} >
                                <Post post={post} votePosts={user.votePosts}/>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
	return {
        user: state.user.user,
		posts: state.post.posts
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(
		{
            fetchPosts: postActions.fetchPosts
		},
		dispatch
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Thread);

