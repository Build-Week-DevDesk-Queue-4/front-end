import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Ticket({ ticket }) {
    const { user_id, description, urgency, reply, solved, category, solved_by } =ticket;
    return (
        <Link to={`tickets/${ticket.id}`}>
            <div style={{border: "1px solid black"}} className="ticketCard">
                <p>Submitted by: {user_id}</p>
                <p>Description: {description}</p>
                <p>Urgency: {urgency}</p>
                <p>Reply: {reply}</p>
                <p>Resolved: {solved}</p>
                <p>Category: {category}</p>
                <p>Solved by: {solved_by}</p>
            </div>
        </Link>
    )
}

export default Ticket;