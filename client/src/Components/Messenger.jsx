import React, {useState , useRef} from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { BiSearchAlt2 } from 'react-icons/bi'
import { FaEdit } from 'react-icons/fa'
import Activefriend from './Activefriend'
import Friends from './Friends'
import RightSide from './RightSide'
import { useDispatch, useSelector } from 'react-redux'
import { getFriends } from '../store/actions/messengerAction'
import { useEffect } from 'react'
import axios from 'axios'
import {messageSend, getMessage, ImageMessageSend} from '../store/actions/messengerAction'
import {io} from 'socket.io-client'


export default function Messenger() {

    const token = localStorage.getItem("authToken");
    const { friends, message} = useSelector(state => state.messenger)
    const { myInfo} = useSelector(state => state.auth)

    const scrollRef = useRef()

    const [currentfriend, setCurrentfriend] = useState('')
    const [newMessage, setNewMessage] = useState('')
    // console.log(newMessage)


    const socket = useRef();

    // console.log(socket) 
    useEffect(()=>{
        socket.current = io('ws://localhost:8000')
    },[])

    useEffect(()=>{
        socket.current.emit('adduser', myInfo.id, myInfo)
    },[])

    useEffect(()=>{
        socket.current.on('getUser', (users)=>{
            console.log(users)
        })
    },[])


    const inputHendle = (e)=>{
        setNewMessage(e.target.value)
    }

    const sendMessage = (e)=>{
        e.preventDefault();
        const data = {
            senderName : myInfo.userName,
            reseverId : currentfriend._id,
            message : newMessage ? newMessage : '❤️'
        }
        dispatch(messageSend(data))
    }

    const emojiSend = (emu)=>{
        setNewMessage(`${newMessage}`+emu)
    }

    const ImageSend = (e)=>{
        if(e.target.files.length !== 0){
            const imageName = e.target.files[0].name;
            const newImageName = Date.now() + imageName

            const fromData = new FormData()
            fromData.append('senderName', myInfo.userName)
            fromData.append('reseverId', currentfriend._id)
            fromData.append('imageName', newImageName)
            fromData.append('image', e.target.files[0])
            dispatch(ImageMessageSend(fromData))
        }
    }

    axios.interceptors.request.use(
        config => {
          config.headers.authorization = `Bearer ${token}`;
          return config;
        },
        error => {
          return Promise.reject(error)
        }
      )



    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getFriends());
    },[])

    useEffect(() => {
        if(friends && friends.length > 0){
            setCurrentfriend(friends[0])
        }
    }, [friends])

    useEffect(() => {
        dispatch(getMessage(currentfriend._id));
    },[currentfriend?._id])
    

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behvior:"smooth"})
    },[message])

    return (
        <div className='messenger'>
            <div className='row'>
                <div className='col-3'>
                    <div className='left-side'>
                        <div className='top'>
                            <div className='image-name'>
                                <div className='image'>
                                    <img src={`./image/${myInfo.image}`} alt='' />
                                </div>
                                <div className='name'>
                                    <h3>{myInfo.userName}</h3>
                                </div>
                            </div>
                            <div className='icons'>
                                <div className='icon'>
                                    <BsThreeDotsVertical />
                                </div>
                                <div className='icone'>
                                    <FaEdit />
                                </div>
                            </div>
                        </div>
                        <div className='friend-search'>
                            <div className='search'>
                                <button><BiSearchAlt2 /></button>
                                <input type='text' name='search' id='search' placeholder='search' className='form-control' />
                            </div>
                        </div>
                        <div className='active-friends'>
                            <Activefriend />
                        </div>
                        <div className='friends'>
                            {
                                friends && friends.length > 0 ? friends.map(fd =>
                                    <div onClick={()=>setCurrentfriend(fd)} 
                                    className={currentfriend._id === fd._id? 'hover-friend active' : 'hover-friend'}>
                                        <Friends friends={fd} />
                                    </div>) : 'no friends'
                            }
                        </div>
                    </div>
                </div>
                {
                    currentfriend ?  <RightSide newMessage={newMessage} 
                    message={message} scrollRef={scrollRef}
                    emojiSend={emojiSend} ImageSend={ImageSend}
                    sendMessage={sendMessage} inputHendle={inputHendle}
                    currentfriend={currentfriend} /> :'Please select your friend'
                }
            </div>
        </div>
    )
}
