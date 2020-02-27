import React from 'react'; 
import axios from 'axios';

export default function Register() {    
    const [registrationInformation, setRegistrationInformation]= ({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })
    axios
    .post(url.id, registrationInformation)
    .then(response => {
        console.log('post response', response)
        localStorage.setItem('token', response.data.token)
    })
    .catch(error => (error));
    

    return(
        <div>
            <form onSubmit= {handleSubmit}>
                <input
                    name= 'firstName'
                    type= 'text'
                    value= {handleChange}
                    placeholder= 'First Name'
                />
                <input
                    name= 'lastName'
                    type= 'text'
                    value= {handleChange}
                    placeholder= 'Last Name'
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