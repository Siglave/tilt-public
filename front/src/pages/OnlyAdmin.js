import React from 'react';
import { connect } from 'react-redux';
import Layout from '../components/Layout';




const OnlyAdmin = ({connectedUser, children}) => {
    if(connectedUser.roles.includes('ROLE_ADMIN')){
        return(
            <React.Fragment>
                {children}
            </React.Fragment>
        )
    }else{
        return (
            <Layout>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh'}}>
                    <h1>Vous ne pouvez pas acceder à cette page</h1>
                </div>
            </Layout>
        );
    }
};


const mapStateToProps = (state) => {
	return {
		connectedUser: state.user.user
	};
};


export default connect(mapStateToProps)(OnlyAdmin);

