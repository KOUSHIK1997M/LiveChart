import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux';
import {userLogin} from '../store/actions/authAction';
import {useAlert} from 'react-alert'
import {SUCCESS_MESSAGE_CLEAR, ERROR_CLEAR} from '../store/types/authType'

export default function Login({history}) {
    
    const dispatch = useDispatch();

    const alert = useAlert();
    const {loading, successMessage, error, authenticate, myInfo} = useSelector(state => state.auth)

    const [state, setState] = useState({
        email:'',
        password:''
    })

    const inputHendle = (e)=>{
        setState({
            ...state,
            [e.target.name] : e.target.value
        })
    }


    const login = (e)=>{
        const {email, password} = state;
        e.preventDefault()
        // console.log(state)
        const formData = new FormData();

        formData.append('email', email);
        formData.append('password', password);
        dispatch(userLogin(formData))
    }

    useEffect(()=>{
        if(authenticate){
            // history.push('/')
            console.log('ok')
        }
        if(successMessage){
            alert.success(successMessage)
            dispatch({type : SUCCESS_MESSAGE_CLEAR})
        }
        if(error){
            error.map(err=>alert.error(err))
            dispatch({type : ERROR_CLEAR})

        }
    },[successMessage, error])

  return (
    <div className='register'>
    <div className='card'>
        <div className='card-header'>
            <h3>Login</h3>
        </div>
        <div className='card-body'>
            <form onSubmit={login}>
                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' name='email' onChange={inputHendle} value={state.email} className='form-control' placeholder='email' id='email' />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' onChange={inputHendle} value={state.password} className='form-control' placeholder='password' id='password' />
                </div>
                <div className='form-group'>
                    <input type='submit' value='login' className='btn' />
                </div>
                <div className='form-group'>
                    <span><Link to='/messenger/register'>Creacte your account</Link></span>
                </div>
            </form>
        </div>
    </div>
</div>
  )
}
