import React from 'react';

import styled from 'styled-components';

import {UserName, UserBlock, DateP} from './styledComponents';

const ReplyStyle = styled.div`
    margin: 24px 0px 0px;
    border-top: 1px solid ${(props)=>props.theme.grey1};
    padding: 16px 12px;
`

const Reply = ({reply, fetchingReplies}) => {

    var creationDate = new Date(reply.creationDate);

    var creationDateString = `${creationDate.getDate()}/${creationDate.getMonth()+1}/${creationDate.getFullYear()}`;
    return (
        <ReplyStyle>
            {(fetchingReplies || reply.creator === undefined )?(
                    <div>
                        <h3>Fetching...</h3> 
                    </div>
                ):(
                <div style={{width: '100%'}}>
                    <div style={{display:'flex', justifyContent: 'space-between'}}>
                        <UserBlock>
                            <UserName
                                to={{ pathname: `/profile/${reply.creator.pseudo}` }}
                                >{reply.creator.pseudo}</UserName>
                        </UserBlock>
                        <div>
                            <DateP>{creationDateString}</DateP>
                        </div>
                    </div>
                    <div>
                        {reply.message}
                    </div>
                </div>
            )}
        </ReplyStyle>
    );
}

export default Reply;
