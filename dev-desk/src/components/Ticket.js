import React, { useState, useContext } from 'react';
import UserContext from '../contexts/UserContext';
import ResolveTicket from './ResolveTicket';
import axiosWithAuth from '../axiosWithAuth';

function Ticket({ ticket }) {
    const {user} = useContext(UserContext);
    const { username, description, urgency, reply, solved, category, solved_by } =ticket;
    const [editing, setEditing] = useState(false);

    const deleteTicket = e => {
        e.preventDefault();
        e.stopPropagation();
        axiosWithAuth().delete('https://daniels-dev-desk-backend.herokuapp.com/api/tickets/id')
            .then()
            .catch(err => console.log(err.response));
    }

    return (
        <div>
            <div
                style={{border: "1px solid black"}}
                className={solved === false ? "ticketCard open" : "ticketCard"}
                onClick={() => {
                    if (user.type === 'admin') {
                        setEditing(true);
                    }
                }}
            >
                <p>Submitted by: {username}</p>
                <p>Category: {category}</p>
                <p>Description: {description}</p>
                <p>Urgency: {urgency}</p>
                {solved === true && <>
                    <p>Solution:</p>
                    <p>{reply}</p>
                    <p>- By {solved_by}</p>
                </>}
                {user.id === ticket.user_id && <button onClick={deleteTicket}>Delete</button>}
            </div>
            {editing && <ResolveTicket ticket={ticket} setEditing={setEditing}/>}
        </div>
    )
}

export default Ticket;