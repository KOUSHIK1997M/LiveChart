import React from 'react'
import { BsChevronDown } from 'react-icons/bs'

export default function FriendInfo(props) {
    const images = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/220px-Image_created_with_a_mobile_phone.png'
    const {currentfriend} = props

    return (
        <div className='friend-info'>
        <input type='checkbox' id='gallery' />
            <div className='image-name'>
                <div className='image'>
                    <img src={`./image/${currentfriend.image}`} alt='' />
                </div>
                <div className='active-user'>
                    Active
                </div>
                <div className='name'>
                    <h4>{currentfriend.userName}</h4>
                </div>
            </div>
            <div className='others'>
                <div className='custom-chat'>
                    <h3>Coustomise Chat</h3>
                    <BsChevronDown />
                </div>
                <div className='privacy'>
                    <h3>Privacy and Support</h3>
                    <BsChevronDown />
                </div>
                <div className='media'>
                    <h3>Shared Media</h3>
                    <label htmlFor='gallery'><BsChevronDown /></label>
                </div>
            </div>
            <div className='gallery'>
                <img src={images} alt='' />
                <img src={images} alt='' />
                <img src={images} alt='' />
                <img src={images} alt='' />
                <img src={images} alt='' />
                <img src={images} alt='' />
                <img src={images} alt='' />
                <img src={images} alt='' />
                <img src={images} alt='' />
                <img src={images} alt='' />
            </div>
        </div>
    )
}
