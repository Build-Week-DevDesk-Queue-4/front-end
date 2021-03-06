import React, {useState, useContext} from 'react';
import axiosWithAuth from '../axiosWithAuth';
import UserContext from '../contexts/UserContext';
import TicketContext from '../contexts/TicketContext';
import './CreateTicket.css'

const CreateTicket = () => {
    const {user} = useContext(UserContext);
    const {setTickets} = useContext(TicketContext);

    const defaultTicket = {
        user_id: user.id,
        username: user.username,

        category: "",
        description: "",
        urgency: "low",

        reply: "",
        solved: false,
        solved_by: "Lambda",
    };

    const [creatingTicket, setCreatingTicket] = useState(defaultTicket);

    const handleSubmit = e => {
        e.preventDefault();
        axiosWithAuth()
            .post('https://daniels-dev-desk-backend.herokuapp.com/api/tickets', creatingTicket)
            .then(setTickets).catch(err => console.log(err.response));
    };

    const handleChange = e => {
        setCreatingTicket({
            ...creatingTicket,
            [e.target.name]: e.target.value
        });
    };
    
    return (
        <div className= 'main-div'>
            <form onSubmit = {handleSubmit}>
                <label>
                    Category:
                    <input
                        name= 'category'
                        type= 'text'
                        value= {creatingTicket.category}
                        onChange= {handleChange}
                    />
                </label>
                <label>
                    Description:
                    <input
                        name= 'description'
                        type= 'text'
                        value= {creatingTicket.description}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Urgency:
                    <select
                        name='urgency'
                        value={creatingTicket.urgency}
                        onChange={handleChange}
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </label>
                <button type= 'submit'>Submit</button>
            </form>
        </div>
    )
}

export default CreateTicket;