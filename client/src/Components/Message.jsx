import React from 'react'
import {useSelector} from 'react-redux'

export default function Message({ message , scrollRef}) {
    const images = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/220px-Image_created_with_a_mobile_phone.png'
    const { myInfo} = useSelector(state => state.auth)
    return (
        <div className='message-show'>
            {
                message && message.length > 0 ? message.map(m =>
                    m.senderId === myInfo.id ? (
                        <div ref={scrollRef} className='my-message'>
                            <div className='image-message'>
                                <div className='my-text'>
                                    <p className='message-text'>{m.message.text === "" ? 
                                    (<img src={`./image/${m.message.image}`} alt='' />) : m.message.text}</p>
                                </div>
                            </div>
                            <div className='time'>
                                2 jun 2022
                            </div>
                        </div>
                    ) : (
                        <div ref={scrollRef} className='fb-message'>
                            <div className='image-message-time'>
                                <img src={images} alt='' />
                                <div className='message-time'>
                                    <div className='fb-text'>
                                    <p className='message-text'>{m.message.text === "" ? 
                                    (<img src={`./image/${m.message.image}`} alt='' />) : m.message.text}</p>
                                    </div>
                                    <div className='time'>
                                        5 jun 2022
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                )
            : ''}
        </div>
    )
}
