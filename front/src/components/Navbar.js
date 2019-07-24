import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Icon} from '../components/styledComponents';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import SearchUsers from './SearchUsers';

import * as authActions from '../actions/authActions';

const Nav = styled.nav`
	/* background-image: linear-gradient(to right top, #31e981, #2edf7b, #2cd676, #29cc70, #27c36b); */
	background-color: ${(props) => props.theme.primary5};
	/* border-bottom: 3px solid ${(props) => props.theme.primary4}; */
	line-height: 48px;
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.25);
`;
const NavbarStyle = styled.ul`
	list-style-type: none;
	background-color: transparent;
	box-sizing: border-box;
	margin: 0;
	padding: 0;
	outline: none;
	margin-bottom: 0;
	padding-left: 0;
	list-style: none;
	display: flex;
	flex-flow: row wrap;
	/* This aligns items to the end line on main-axis */
	justify-content: flex-start;
	align-items: center;
	&::after {
		content: "";
		flex-grow: 1;
		order: 0;
	}
	@media (max-width: 800px) {
		/* When on medium sized screens, we center it by evenly distributing empty space around items */
		justify-content: space-around;
	}

	/* Small screens */
	@media (max-width: 500px) {
		/* On small screens, we are no longer using row direction but column */
		flex-direction: row;
	}
`;

const NavbarItem = styled.li`
	margin: 0;
	padding: 0 16px;
	display: block;
	float: left;
	position: relative;
	text-align: center;
`;
const LogoText = styled.h1`
	color: ${(props) => props.theme.white};
	font-size: 28px;
`;

class Navbar extends Component {
    render() {
        return (
            <Nav>
                <NavbarStyle>
                    <NavbarItem>
                        <Link to="/" style={{ display: 'flex', alignItems: "center", cursor: "pointer" }}>
                            <LogoText>TilT</LogoText>
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <SearchUsers/>
                    </NavbarItem>
					<NavbarStyle style={{order: 1}}>
						{this.props.user.roles.includes('ROLE_ADMIN') ? (
							<NavbarItem>
								<Link to="/admin" style={{ display: 'flex', alignItems: "center", color: 'white' }}>
									Admin
								</Link>
							</NavbarItem>
						):null}
						<NavbarItem>
							<Link to="/discussions/all" style={{ display: 'flex', alignItems: "center", color: 'white' }}>
								<span role='img' aria-label=''>💬</span>Messages
							</Link>
						</NavbarItem>
						<NavbarItem>
							<Link to={{ pathname: `/profile/${this.props.user.pseudo}` }} style={{ display: 'flex', alignItems: "center", color: 'white' }}>
								<Icon inherit='true' right='true' icon={faUser}/> {this.props.user.pseudo}
							</Link>
						</NavbarItem>
						<NavbarItem>
							<span onClick={()=>{
								this.props.logout();
							}} style={{ display: 'flex', alignItems: "center", color: 'white', cursor: 'pointer' }}>
								Déconnexion
							</span>
						</NavbarItem>
					</NavbarStyle>
                </NavbarStyle>
            </Nav> 
        );
    }
}

const mapStateToProps = (state) => {
	return {
        user: state.user.user
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(
		{
            logout: authActions.logout
		},
		dispatch
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
