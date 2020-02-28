import React, {useState} from 'react'; 
import axios from 'axios';

export default function AuthForm(role, history) {    
    const [authInfo, setAuthInfo]= useState({
        fullName: '',
        email: '',
        password: '',
        isAdmin: false,
        adminKey: ''
    })
    const handleChange = e => {
        e.preventDefault();
        setAuthInfo({...authInfo, [e.target.name]: e.target.value})
    }
    const handleSubmit = e => {
        e.preventDefault();  
          console.log('something');
        axios
        .post(`https://daniels-dev-desk-backend.herokuapp.com/api/auth/register/${role}`, authInfo)
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
                    name= 'fullName'
                    type= 'text'
                    onChange= {authInfo.fullName}
                    value= {authInfo.fullName}
                    placeholder= 'First Name'
                />
               
                <input
                    name= 'email'
                    type= 'text'
                    value= '' 
                    onChange= {authInfo.email}
                    placeholder= 'Email'
                />
                <input
                    name= 'password'
                    type= 'text'
                    onChange= {authInfo.password}
                    placeholder= 'Password'
                />    
                <input
                    name= 'AdminKey'
                    type= 'text'
                    onChange= {authInfo.AdminKey}
                    placeholder= 'Admin Key'
                /> 

                <button type= 'submit'>Submit</button>   
            </form>

        </div>
    )
}