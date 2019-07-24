import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { Row, TrophyIcon, UserName} from '../components/styledComponents';
import { Link } from 'react-router-dom';

import FollowButton from './FollowButton';

const ProfileBlockStyle = styled.div`
    padding: 24px;
    background: white;
    border-radius: 4px;
    min-width: 250px;
    max-width: 350px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
`
const ModifyLink = styled(Link)`
    display: flex;
	justify-content: center;
	align-items: center;
	text-transform: uppercase;
    padding: 2px 24px;
    transition: all 0.6s;
    border: 1px solid ${(props)=>props.theme.primary4};
    color: ${(props)=>props.theme.primary4};
    background-color: ${(props)=>props.theme.white};
    :hover {
        background-color: ${(props)=>props.theme.primary1};
    }
    :focus {
        background-color: ${(props)=>props.theme.primary1};
    }	
	font-size: 10px;
	border-radius: 2px;
	font-weight: 500;
`

const ProfileBlock = ({userProfile, connectedUser}) => {
    return (
        <ProfileBlockStyle>
            <Row style={{justifyContent: 'space-between'}}>
                <div>
                    <UserName to={{ pathname: `/profile/${userProfile.pseudo}` }} style={{fontSize: '20px'}}>{userProfile.pseudo}</UserName>
                </div>
                <div>
                    {connectedUser._id === userProfile._id ?(
                            <ModifyLink to={{pathname: '/me/update'}}>Modifier</ModifyLink>
                        ):(
                            <FollowButton userToFollowId={userProfile._id}/>
                        )}
                </div>
            </Row>
            <div style={{marginTop: '12px'}}>
                <p style={{fontSize: '14px'}}>
                    <TrophyIcon style={{fontSize: '14px'}} right='true' icon={faTrophy} isactive='true'/>{userProfile.vote}
                </p>
            </div>
            <div style={{marginTop: '16px'}}>
                {userProfile.description}
            </div>
        </ProfileBlockStyle>
    );
}

const mapStateToProps = (state) => {
	return {
        connectedUser: state.user.user,
	};
};


export default connect(mapStateToProps)(ProfileBlock);
