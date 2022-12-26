import axios from 'axios'
import {FRIENDS_GET_SUCCESS, MESSAGE_GET_SUCCESS, MESSAGE_SEND_SUCCESS, IMAGE_MESSAGE_SEND_SUCCESS} from '../types/messengerType'

export const getFriends = ()=>{
    return async (dispatch)=>{
        const  url = 'http://localhost:8080'
        try{
            const response = await axios.get(`${url}/api/messenger/get-friends`)
            dispatch({
                type: FRIENDS_GET_SUCCESS,
                payload: {
                    friends: response.data.friends
                }
            })
            // console.log(response.data.friends)
        }catch(error){
            console.log(error.response.data)
        }
    }
}



export const messageSend = (data)=>{
    return async (dispatch)=>{
        const url ='http://localhost:8080'
        try{
            const response = await axios.post(`${url}/api/messenger/send-message`, data)

            dispatch({
                type : MESSAGE_SEND_SUCCESS,
                payload:{
                    message : response.data.message
                }
            })
            // console.log(response.data)
        }catch(error){
            console.log(error.response.data)
        }
    }
}

export const getMessage = (id)=>{
    return async (dispatch)=>{
        const url ='http://localhost:8080'
        try{
            const response = await axios.get(`${url}/api/messenger/get-message/${id}`)
            console.log(response.data)
            dispatch({
                type : MESSAGE_GET_SUCCESS,
                payload : {
                    message : response.data.message,
                }
            })
        }catch(error){
            console.log(error.response.data)
        }
    }
}

export const ImageMessageSend = (data)=>{
    return async (dispatch)=>{
        const url ='http://localhost:8080'
        try{
            const response = await axios.post(`${url}/api/messenger/image-message-send`, data)

            dispatch({
                type : IMAGE_MESSAGE_SEND_SUCCESS,
                payload:{
                    message : response.data.message
                }
            })
            // console.log(response.data)
        }catch(error){
            console.log(error.response.data)
        }
    }
}


