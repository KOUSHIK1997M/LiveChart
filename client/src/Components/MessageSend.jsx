import React from 'react'
import { BiMessageAltEdit } from 'react-icons/bi'
import { BsPlusCircle } from 'react-icons/bs'
import { RiGalleryLine } from 'react-icons/ri'
import { AiFillGift, AiOutlineSend } from 'react-icons/ai'

export default function MessageSend({ newMessage, inputHendle, sendMessage, emojiSend,ImageSend }) {
    const Emoji = [
        "😀", "😃", '😄', '😁', '😆', '😅',
        '😂', '🤣', '😊', '😇', '🙂', '🙃',
        '😉', '😌', '😍', '🥰', '😘', '😗',
        '😙', '😚', '😋', '😛', '😝', '😜',
        '🤨', '🧐', '🤓', '😎', '🤩', '🥳',
        '😏', '😒', '😞', '😔', '😟', '😕',
        '🙁', '☹️', '😣', '😖', '😫', '😩',
        '🥺', '😢', '😭', '😮', '😤', '😠',
        '😡', '🤬', '🤯', '😳', '🥵', '🥶',
        '😱', '😨', '😰', '😥', '😓', '🤗'
    ]
    return (
        <div className='message-send-section'>
            <input type='checkbox' id='emoji' />
            <div className='file hover-attachment'>
                <div className="add-attachment">
                    Add AttachMent
                </div>
                <BsPlusCircle />
            </div>
            <div className='file hover-image'>
                <div className="add-image">
                    Add image
                </div>
                <input type='file' id='pic' onChange={ImageSend} className='form-control' />
                <label htmlFor='pic'><RiGalleryLine /></label>
            </div>
            <div className='file'>
                <BiMessageAltEdit />
            </div>
            <div className='file hover-gift'>
                <div className="add-gift">
                    Add gift
                </div>
                <AiFillGift />
            </div>
            <div className='message-type'>
                <input type='text'  onChange={inputHendle} value={newMessage} name='message' id='message' placeholder='Aa' className='form-control' />
                <label htmlFor='emoji'>🙂</label>
            </div>
            <div onClick={sendMessage} className='file'>
                {newMessage.length > 0 ? <AiOutlineSend /> : "❤️"}
            </div>
            <div className="emoji-section">
                <div className="emoji">
                    {Emoji.map(e => <span onClick={()=>emojiSend(e)}>{e}</span>)}
                </div>
            </div>
        </div>
    )
}
