import React from 'react';
import Navbar from './Navbar';
import styled from 'styled-components';
import NewPostModal from '../components/NewPostModal';

const LayoutStyle = styled.div`
    min-height: 100vh;
    background: ${(props)=> props.theme.grey0 };
`

const Layout = ({children}) => {
    return (
        <LayoutStyle>
            <Navbar/>
            <NewPostModal/>
            {children}
        </LayoutStyle>
    );
}

export default Layout;