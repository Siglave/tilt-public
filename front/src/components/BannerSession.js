import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../actions/authActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const BannerStyle = styled.div`
    position: absolute;
    top: 16px;
    background: ${(props)=>props.theme.white};
    padding: 18px 24px;
    border-left: 5px solid ${(props)=>props.theme.secondary4};
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    left: 50%;
    margin-left: -200px;
    border-radius: 1px 4px 4px 1px;
    @media (max-width: 800px) {
        left: 0%;
        margin: 0px 8px;
    }
`
const CloseBanner = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	z-index: 10;
	font-weight: 700;
	padding: 2px 4px;
	cursor: pointer;
	:hover {
		color: grey;
	}
`;

const BannerSession = ({visible, hideBannerSession}) => {
    if(visible){
        return (
            <BannerStyle>
                <CloseBanner onClick={()=>{
                    hideBannerSession();
                }}>
                    <FontAwesomeIcon icon={faTimes} />
                </CloseBanner>
                <div>
                    <p>Votre <b>session a expirée</b>, veuillez vous <b>reconnecter</b></p>
                </div>
            </BannerStyle>
        );
    }else{
        return null;
    }
}


const mapStateToProps = (state) => {
	return {
        visible: state.auth.showBannerSession,
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(
		{
            hideBannerSession: authActions.hideBannerSession,
		},
		dispatch
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(BannerSession);
