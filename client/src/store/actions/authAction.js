import axios from 'axios'
import {REGISTER_FAIL, REGISTER_SUCCESS, USER_LOGIN_SUCCESS, LOGIN_FAIL} from '../types/authType'

export const userRegister = (data) =>{
    return async (dispatch) =>{
        const url = 'http://localhost:8080'
        const config = {
            headers : {
                'Content-Type': 'application/josn'
            }
        }
        try{
            const response = await axios.post(`${url}/api/messenger/user-register`, data, config)
            
            localStorage.setItem('authToken', response.data.token)
            
            dispatch({
                type : REGISTER_SUCCESS,
                payload : {
                    successMessage : response.data.successMessage,
                    token : response.data.token
                }
            })

        }catch(error){
            let data = error.response.data.error.errorMessage
            dispatch({
                type : REGISTER_FAIL,
                payload:{
                    error : data
                }
            })
        }
    }
}



export const userLogin = (datas) =>{
    return async (dispatch) =>{
        const url = 'http://localhost:8080'
        const config = {
            headers : {
                'Content-Type': 'application/josn'
            }
        }
        try{
            // console.log(datas.email)
            const response = await axios.post(`${url}/api/messenger/user-login`, datas, config)
            
            localStorage.setItem('authToken', response.data.token)
            
            dispatch({
                type : USER_LOGIN_SUCCESS,
                payload : {
                    successMessage : response.data.successMessage,
                    token : response.data.token
                }
            })

        }catch(error){
            let data = error.response.data.error.errorMessage
            dispatch({
                type : LOGIN_FAIL,
                payload:{
                    error : data
                }
            })
        }
    }
}
