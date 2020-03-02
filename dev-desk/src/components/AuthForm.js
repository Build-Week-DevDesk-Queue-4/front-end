import React, {useState} from 'react'; 
import {Link} from 'react-router-dom';
import axios from 'axios';

export default function AuthForm({role, history}) {    
    const [authInfo, setAuthInfo]= useState({
        username: '',
        password: '',
        type: ''
    })
    const handleChange = e => {
        e.preventDefault();
        setAuthInfo({...authInfo, [e.target.name]: e.target.value})
    }
    const handleSubmit = e => {
        e.preventDefault();  
          console.log('something');
        axios
        .post(`https://daniels-dev-desk-backend.herokuapp.com/api/auth/${role}`, authInfo)
        .then(response => {
            console.log('post response', response)
            localStorage.setItem('token', response.data.token)
        })
        .catch(error => (error));
        }
        
        
    return(
        
        
        <div className= 'AuthForm'>
            <form onSubmit= {handleSubmit}>
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
                
                
                {role === 'register' ? 
                <>
                <input
                    name= 'type'
                    type= 'text'
                    onChange= {handleChange}
                    value= {authInfo.type}
                    placeholder= 'type'
                    
                />  
                <div>
                <button type= 'submit'>Submit</button>   
                </div>
                <Link to= '/'>Login</Link> 
                </>
                : null}
                
                {role === 'login' ?
                <Link to= '/register'>Click here to Register</Link>       
                : null}
                
                
            </form>

        </div>
    )
}