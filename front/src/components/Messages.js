import React from 'react';
import styled from 'styled-components'

import {UserName, UserBlock, DateP} from './styledComponents';

const MessagesBlock = styled.div``
const MessageStyle = styled.div`
    padding: 24px;
    background: ${(props)=>props.theme.grey1};
    border-radius: 4px;
    margin: 32px 0;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    ${(props)=>( 
            props.fromConnectedUser ? `
                margin-left: 48px;
                background: ${props.theme.primary1};
            ` :""
        )}

`

const Messages = ({messages, connectedUserId}) => {    
    return (
        <MessagesBlock>
            {messages.map((message)=>{
                var fromConnectedUser = connectedUserId === message.creator._id;
                var creationDate = new Date(message.creationDate);
                var creationDateString = `${creationDate.getDate()}/${creationDate.getMonth()+1}/${creationDate.getFullYear()}`;
                
                return(
                    <MessageStyle key={message._id} fromConnectedUser={fromConnectedUser}>
                        <div style={{display: 'flex', justifyContent:'space-between'}}>
                            <UserBlock>
                                <UserName
                                    to={{ pathname: `/profile/${message.creator.pseudo}` }}
                                    >{message.creator.pseudo}</UserName>
                            </UserBlock>
                            <div>
                                <DateP>{creationDateString}</DateP>
                            </div>
                        </div>
                        <div style={{margin: '4px 0 0 0'}}>
                            {message.message}
                        </div>
                    </MessageStyle>
                )
            })}
        </MessagesBlock>
    );
}

export default Messages;
