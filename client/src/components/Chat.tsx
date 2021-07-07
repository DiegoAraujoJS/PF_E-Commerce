import React from 'react'
import {ChatItem, MessageBox} from 'react-chat-elements'


export default function Chat() {
    return (
        
        <MessageBox
    reply={{
        photoURL: 'https://facebook.github.io/react/img/logo.svg',
        title: 'elit magna',
        titleColor: '#8717ae',
        message: 'Aliqua amet incididunt id nostrud',
    }}
    onReplyMessageClick={() => console.log('reply clicked!')}
    position={'left'}
    type={'text'}
    text={'Tempor duis do voluptate enim duis velit veniam aute ullamco dolore duis irure.'}/>
        
    )
}





