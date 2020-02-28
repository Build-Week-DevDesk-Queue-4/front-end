import React, {useState} from 'react'; 
import axios from 'axios';

export default function AuthForm() {    
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
        .post(`url/${role}`, authInfo)
        .then(response => {
            console.log('post response', response)
            localStorage.setItem('token', response.data.token)
        })
        .catch(error => (error));
        }
    

    return(
        <div>
            <form onSubmit= {handleSubmit}>
                <input
                    name= 'fullName'
                    type= 'text'
                    value= {handleChange}
                    placeholder= 'First Name'
                />
               
                <input
                    name= 'email'
                    type= 'text'
                    value= {handleChange}
                    placeholder= 'Email'
                />
                <input
                    name= 'password'
                    type= 'text'
                    value= {handleChange}
                    placeholder= 'Password'
                />           
            </form>

        </div>
    )
}