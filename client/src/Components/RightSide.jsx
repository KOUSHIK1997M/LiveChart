import React from 'react'
import { BsCameraVideoFill } from 'react-icons/bs'
import { HiDotsCircleHorizontal } from 'react-icons/hi'
import { IoCall } from 'react-icons/io5'
import FriendInfo from './FriendInfo'
import Message from './Message'
import MessageSend from './MessageSend'

export default function RightSide(props) {

    const {currentfriend, newMessage, inputHendle, sendMessage, message, scrollRef, emojiSend , ImageSend} = props

    return (
        <div className='col-9'>
            <div className='right-side'>
            <input type='checkbox' id='dot' />
                <div className='row'>
                    <div className='col-8'>
                        <div className='message-send-show'>
                            <div className='header'>
                                <div className='image-name'>
                                    <div className='image'>
                                        <img src={`./image/${currentfriend.image}`} alt='' />
                                        <div className='active-icon'></div>
                                    </div>
                                    <div className='name'>
                                        <h3>{currentfriend.userName}</h3>
                                    </div>
                                </div>
                                <div className='icons'>
                                    <div className='icon'>
                                        <IoCall />
                                    </div>
                                    <div className='icon'>
                                        <BsCameraVideoFill />
                                    </div>
                                    <div className='icon'>
                                        <label htmlFor='dot'><HiDotsCircleHorizontal /></label> 
                                    </div>
                                </div>
                            </div>
                            <Message message={message} scrollRef={scrollRef} />
                            <MessageSend newMessage={newMessage} emojiSend={emojiSend}
                            ImageSend={ImageSend}
                             sendMessage={sendMessage} inputHendle={inputHendle}/>
                        </div>
                    </div>
                    <div className='col-4'>
                    {
                        currentfriend ? <FriendInfo currentfriend={currentfriend}/> : null 
                    }
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
