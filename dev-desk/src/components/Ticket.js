import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import ResolveTicket from './ResolveTicket';

function Ticket({ ticket }) {
    const {user} = useContext(UserContext);
    const { username, description, urgency, reply, solved, category, solved_by } =ticket;
    const [editing, setEditing] = useState(false);

    return (
        <div>
            <div style={{border: "1px solid black"}} className="ticketCard" onClick={() => {
                if (user.type === 'admin') {
                    setEditing(true);
                }
            }}>
                <p>Submitted by: {username}</p>
                <p>Category: {category}</p>
                <p>Description: {description}</p>
                <p>Urgency: {urgency}</p>
                {solved === true && <>
                    <p>Solution:</p>
                    <p>Reply: {reply}</p>
                    <p>Solved by: {solved_by}</p>
                </>}
            </div>
            {editing && <ResolveTicket ticket={ticket} setEditing={setEditing}/>}
        </div>
    )
}

export default Ticket;