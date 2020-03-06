import React, {useState} from 'react';
import axiosWithAuth from 'axios';


const CreateTicket = () => {
    const [creatingTicket, setCreatingTicket] = useState({
        user_id: '',
        description: "",
        urgency: "",
        reply: "",
        solved: false,
        category: "",
        solved_by: "",
        username: ""
    })

    const handleSubmit = e => {
    axiosWithAuth()
    .post('https://daniels-dev-desk-backend.herokuapp.com/api/tickets', creatingTicket)
    .then(response => {
        console.log('response', response);        
    })};
    
    return (
        <div>
            <form onSubmit = {handleSubmit}>
                <input
                    name= 'user_id'
                    type= 'text'
                    value= ''
                    onChange= ''
                />
                <input
                    name= 'description'
                    type= 'text'
                    value= ''
                    onChange= ''
                />
                <input
                    name= 'category'
                    type= 'text'
                    value= ''
                    onChange= ''
                />
                <input
                    name= 'reply'
                    type= ''
                    value= ''
                    onChange= ''
                />
                <input
                    name= 'solved'
                    type= ''
                    value= ''
                    onChange= ''
                />  
                <input
                    name= 'category'
                    type= ''
                    value= ''
                    onChange= ''
                />
                <input
                    name= 'solved_by'
                    type= ''
                    value= ''
                    onChange= ''
                />
                <input
                    name= 'username'
                    type= ''
                    value= ''
                    onChange= ''
                />
                <button type= 'submit'>Submit</button>
            </form>
        </div>
    )
}

export default CreateTicket;