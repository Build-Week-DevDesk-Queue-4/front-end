import React, {useState, useContext} from 'react'; 
import {Link} from 'react-router-dom';
import axios from 'axios';
import UserContext from '../contexts/UserContext';

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

    const handleLoginResponse = response => {
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        setUser({
            username: response.data.user.username,
            type: response.data.user.type,
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
<<<<<<< HEAD
                
                
                {role === 'register' ? 
                <>
                <input
                    name= 'type'
                    type= 'text'
                    onChange= {handleChange}
                    value= {authInfo.type}
                    placeholder= 'type'
                    
                /> 
                {/* <div>
                <button type= 'submit'>Submit</button>   
                </div> */}
                
                <Link to= '/'>Login</Link> 
                </>
                : null}
                <div>
                <button type= 'submit'>Submit</button>
                </div>
                {role === 'login' ?
                <Link to= '/register'>Click here to Register</Link>       
                : null}
                
=======
                <button type= 'submit'>Submit</button>
>>>>>>> bb1f1f56b020c8963d2e13c36973c33d762fe23f
            </form>
        </div>
    )
}