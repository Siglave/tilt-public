import React from 'react';
import { connect } from 'react-redux';

import Home from './Home';



const AuthPage = ({userLogIn, children}) => {
    if(userLogIn){
        return(
            <React.Fragment>
                {children}
            </React.Fragment>
        )
    }else{
        return (<Home/>);
    }
};


const mapStateToProps = (state) => {
	return {
		userLogIn: state.auth.userLogIn
	};
};


export default connect(mapStateToProps)(AuthPage);

