import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled, { createGlobalStyle  } from 'styled-components';
import { Switch, Route, withRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';


import HomeConnectedUser from './pages/HomeConnectedUser';
import AuthPage from './pages/AuthPage';
import OnlyAdmin from './pages/OnlyAdmin';
import Profile from './pages/Profile';
import UpdateUser from './pages/UpdateUser';
import ResetPassword from './pages/ResetPassword';
import ChangePassword from './pages/ChangePassword';
import Discussion from './pages/Discussion';
import Admin from './pages/Admin';
import Page404 from './pages/404';

import {Loader} from './components/styledComponents';

import * as userActions from './actions/userActions';

// https://mycolor.space/?hex=%23414756&sub=1
// https://mycolor.space/?hex=%232491FF&sub=1
const AppStyle = styled.div`height: 100vh;`;
const theme = {
	primary: '#31E981',
	secondary: '#1C3144',
	secondaryGreen: '#2AFC98',
	fontFamilyText: "'Open Sans', sans-serif",
	fontFamilyTitle: "'Nunito', sans-serif",
	white: "#FFF",
	yellow: '#ffe200',
	primary8:'#00247A',
	primary7:'#003C9A',
	primary6:'#0056BB',
	primary5:'#0073DC',
	primary4:'#448DFA',
	primary3:'#69A7FF',
	primary2:'#8AC3FF',
	primary1:'#AAE0FF',
	secondary7:'#0B2A18',
	secondary6:'#196A3B',
	secondary5:'#29A95E',
	secondary4:'#37E881',
	secondary3:'#6DEEA3',
	secondary2:'#A4F4C5',
	secondary1:'#DAFAE8',
	red7:'#2A0909',
	red6:'#671616',
	red5:'#A52323',
	red4:'#E22F2F',
	red3:'#E96767',
	red2:'#F1A0A0',
	red1:'#F9D9D9',
	grey6:'#1E2431',
	grey5:'#414756',
	grey4:'#626878',
	grey3:'#858C9C',
	grey2:'#AAB1C2',
	grey1:'#D1D7E9',
	grey0:'#e4e8ef',
};

const NeedAuthComponent = (Component, props) => {
	return(
		<AuthPage>
			<Component {...props} />
		</AuthPage>
	);
}

const OnlyAdminComponent = (Component, props) => {
	return(
		<AuthPage>
			<OnlyAdmin>
				<Component {...props} />
			</OnlyAdmin>
		</AuthPage>
	);
}

const App = ({fetchLoginUser, userLogIn}) => {
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		if(userLogIn){
			setLoading(true);
			fetchLoginUser()
			.then(()=>{
				setLoading(false);
			})
		}
	},[]);
	return (
		<ThemeProvider theme={theme}>
			<React.Fragment>
				<GlobalStyle/>
				<AppStyle>
					{!loading ?(
						<div>
							<div style={{ width: '100%' }}>
								<Switch>
									<Route exact path="/resetPassword" component={ResetPassword} />
									<Route path="/changePassword/:token" component={ChangePassword}/>
									<Route exact path="/" component={(props)=>{ return NeedAuthComponent(HomeConnectedUser, props)}} />
									<Route exact path="/admin" component={(props)=>{ return OnlyAdminComponent(Admin, props)}} />
									<Route path="/discussions/:id" component={(props)=>{ return NeedAuthComponent(Discussion, props)}} />
									<Route exact path="/profile/:pseudo" component={(props)=>{ return NeedAuthComponent(Profile, props)}} />
									<Route exact path="/me/update" component={(props)=>{ return NeedAuthComponent(UpdateUser, props)}} />
									<Route component={Page404} />
								</Switch>
							</div>
						</div>
					):(
						<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh'}}>
							<Loader/>
						</div>
					)}
				</AppStyle>
			</React.Fragment>
		</ThemeProvider>
	);
}
const GlobalStyle = createGlobalStyle `
	@import url('https://fonts.googleapis.com/css?family=Nunito|Open+Sans&display=swap');
	*{
		outline: none;
		margin: 0;
		padding:0;
		font-family: ${theme.fontFamilyText};
	}
	body {
		margin: 0;
		padding: 0;
		font-family: sans-serif;
		color: ${theme.grey6} ;
		font-family: ${theme.fontFamilyText};
		font-size: 16px;
	}
	h1,h2,h3,h4,h5,h6{
		font-family: ${theme.fontFamilyTitle};
		font-weight: 400;
	}
	a{
		background-color: transparent;
		text-decoration: none;
		outline: none;
		cursor: pointer;
		color: inherit ;
	}

`;

const mapStateToProps = (state) => {
	return {
		userLogIn: state.auth.userLogIn
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(
		{
			fetchLoginUser: userActions.fetchLoginUser,
		},
		dispatch
	);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
