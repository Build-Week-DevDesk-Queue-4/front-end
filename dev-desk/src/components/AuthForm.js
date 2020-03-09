import React, {useState, useContext} from 'react'; 
import {Link} from 'react-router-dom';
import axios from 'axios';
import UserContext from '../contexts/UserContext';
import lambda from '../image/lambda.svg';
import authImage from '../image/authImage.svg';

export default function AuthForm({role, history}) {
    const {setUser} = useContext(UserContext);

    const [authInfo, setAuthInfo]= useState({
        username: '',
        password: '',
        type: 'user'
    })
    const handleChange = e => {
        setAuthInfo({...authInfo, [e.target.name]: e.target.value});
    }

    const handleLoginResponse = ({data: {token, user}}) => {
        console.log(user);
        localStorage.setItem('token', token);
        setUser({
            username: user.username,
            id: user.id,
            type: user.type,
        })
        history.push("/");
    }
    // TODO: instead of console.log'ing the error, store state for the error and display to the user
    const login = () => {
        axios.post('https://daniels-dev-desk-backend.herokuapp.com/api/auth/login', authInfo)
            .then(handleLoginResponse)
            .catch(console.log);
    }
    const registerAndLogin = () => {
        axios.post('https://daniels-dev-desk-backend.herokuapp.com/api/auth/register', authInfo)
            .then(() => axios.post('https://daniels-dev-desk-backend.herokuapp.com/api/auth/login', authInfo))
            .then(handleLoginResponse)
            .catch(console.log);
    }

    const handleSubmit = e => {
        e.preventDefault();  
        if (role === 'login') {
            login();
        } else if (role === 'register') {
            registerAndLogin();
        }
    }

    return(
        <div className= 'AuthForm'>
            <form onSubmit= {handleSubmit}>
                <img src={lambda} alt="Lambda School Logo" className='lambda-logo'/>
                <img src={authImage} alt="Person at computer"/>
                
                <label>Full Name</label>
                <input
                    className='text-input'
                    name= 'username'
                    type= 'text'
                    onChange= {handleChange}
                    value= {authInfo.username}
                />

                <label>Password</label>
                <input
                    className='text-input'
                    name= 'password'
                    type= 'password'
                    value= {authInfo.password} 
                    onChange= {handleChange}
                />

                {/* This div specifically for the radio buttons */}
                {role === 'register' && <div className="user-type-radio">
                    <div>
                        <input
                            type='radio'
                            name='type'
                            id='user'
                            value='user'
                            checked={authInfo.type === 'user'}
                            onChange={handleChange}
                        />
                        <label 
                            className={authInfo.type === 'user' ? "selected" : null}
                            htmlFor='user'
                        >User</label>
                    </div>
                    <div>
                        <input
                            type='radio'
                            name='type'
                            id='admin'
                            value='admin'
                            checked={authInfo.type === 'admin'}
                            onChange={handleChange}
                        />
                        <label
                            className={authInfo.type === 'admin' ? "selected" : null}
                            htmlFor='admin'
                        >Helper</label>
                    </div>
                    
                </div>}

                {role === 'login' && <>
                    <button type= 'submit'>Sign In</button>
                    <Link to= '/register'>Don't have an account?</Link>
                </>}
                {role === 'register' && <>
                    <button type= 'submit'>Sign Up</button>
                    <Link to='/login'>Already have an account?</Link>
                </>}
            </form>
        </div>
    )
}