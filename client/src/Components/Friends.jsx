import React from 'react'

export default function Friends({friends}) {
    // const images = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/220px-Image_created_with_a_mobile_phone.png'

    return (
        <div className='friend'>
            <div className='friend-image'>
                <div className='image'>
                    <img src={`./image/${friends.image}`} alt='' />
                </div>
            </div>
            <div className='friend-name'>
                <h4>{friends.userName}</h4>
            </div>
        </div>
    )
}
