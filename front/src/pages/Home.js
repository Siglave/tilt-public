import React, {useState} from 'react';
import styled from 'styled-components';
import Login from '../components/forms/login';
import Registration from '../components/forms/registration';

import BannerSession from '../components/BannerSession';

const HomeStyle = styled.div`
    min-height: 100vh;
    background: ${props => props.theme.white};
    display: flex;
    justify-content: space-around;
    @media (max-width: 800px) {
		flex-wrap: wrap;
	}

`

const HomeSection = styled.div`
    flex-grow: 1;
    background: ${(props)=> props.blue ? props.theme.primary5 : props.theme.white};
    padding: 32px;
    color:  ${(props)=> props.blue ? props.theme.white : 'inherit'};
`
const TitleForm = styled.h2`
    cursor: pointer;
    ${(props)=>{
        return (props.active ? (
            `border-bottom: 2px solid ${props.theme.secondary4}`
        ): '');
    }}
`

const Home = () => {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <React.Fragment>
            <HomeStyle>
                <HomeSection blue style={{display:'flex', justifyContent: 'center', alignItems: 'center', flexBasis: '50%'}}>
                    <h1 style={{fontSize: '48px'}}>TilT</h1>
                </HomeSection>
                <HomeSection style={{flexBasis: '50%'}}>
                    <div style={{marginTop: '32px'}}>
                        <div style={{display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap'}}>
                            <TitleForm active={!showLogin} onClick={()=>{setShowLogin(false)}}>Inscription</TitleForm>
                            <TitleForm active={showLogin} onClick={()=>{setShowLogin(true)}}>Connexion</TitleForm>
                        </div>
                        <div>
                            {showLogin ?(<Login/>) :(<Registration/> )}                           
                        </div>
                    </div>
                </HomeSection>
                <BannerSession/>
            </HomeStyle>
        </React.Fragment>
    );
}

export default Home;
