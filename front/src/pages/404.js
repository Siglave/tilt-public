import React from 'react';
import styled from 'styled-components';
import { Button } from '../components/styledComponents';

const PageStyle = styled.div`
    min-height: 100vh;
    background: ${(props)=> props.theme.grey0 };
    display: flex;
    justify-content: center;
    align-items: center;
`
const TitlePage = styled.h1`
    font-size: 32px;
    color: ${(props)=>props.theme.grey6};
`

const Page404 = (props) => {
    return (
        <PageStyle>
            <div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <TitlePage><span role='img' aria-label=''>🕵️‍♂️</span> 404 Page not found</TitlePage>
                </div>
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '32px'}}>
                    <Button primary onClick={()=>{
                        props.history.push('/');
                    }}>Accueil</Button>
                </div>
            </div>
        </PageStyle>
    );
}

export default Page404;
