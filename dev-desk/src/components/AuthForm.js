import React, {useState} from 'react'; 
import {Link} from 'react-router-dom';
import axios from 'axios';

export default function AuthForm({role, history}) {    
    const [authInfo, setAuthInfo]= useState({
        username: '',
        password: '',
        type: 'user'
    })
    const handleChange = e => {
        setAuthInfo({...authInfo, [e.target.name]: e.target.value});
    }

    const handleLoginResponse = response => {
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        history.push("/");
    }
    const login = () => {
        axios.post('https://daniels-dev-desk-backend.herokuapp.com/api/auth/login', authInfo)
            .then(handleLoginResponse)
            .catch(console.log);
    };
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
            {role === 'login' && <Link to= '/register'>Registration Page</Link>}
            {role === 'register' && <Link to='/login'>Login Page</Link>}
            <form onSubmit= {handleSubmit}>
                {/* This div specifically for the radio buttons */}
                {role === 'register' && <div className="user-type-radio">
                    <input
                        type='radio'
                        name='type'
                        id='user'
                        value='user'
                        checked={authInfo.type === 'user'}
                        onChange={handleChange}
                    />
                    <label htmlFor='user'>User</label>

                    <input
                        type='radio'
                        name='type'
                        id='admin'
                        value='admin'
                        checked={authInfo.type === 'admin'}
                        onChange={handleChange}
                    />
                    <label htmlFor='admin'>Helper</label>
                </div>}

                <input
                    name= 'username'
                    type= 'text'
                    onChange= {handleChange}
                    value= {authInfo.username}
                    placeholder= 'username'
                />
               
                <input
                    name= 'password'
                    type= 'password'
                    value= {authInfo.password} 
                    onChange= {handleChange}
                    placeholder= 'password'
                />
                <button type= 'submit'>Submit</button>   
            </form>
        </div>
    )
}