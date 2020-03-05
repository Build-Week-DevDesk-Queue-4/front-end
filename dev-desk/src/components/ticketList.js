import React, {useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import axiosWithAuth from '../axiosWithAuth';

const TicketList = ({filter}) => {
    const [tickets, setTickets] = useState([]);

    if (filter === undefined) {
        filter = () => true;
    }

    useEffect(() => {
        axiosWithAuth().get('https://daniels-dev-desk-backend.herokuapp.com/api/tickets')
            .then(response => {
                setTickets(response.data.tickets);
            })
            .catch(error => {
                console.error('Server Error', error);
            });
    }, []);

    return (
        <div className="ticket-list">
            {tickets.filter(filter).map(ticket => (
                <TicketListItem key={ticket.id} ticket={ticket} />
            ))}
        </div>
    );
}

function TicketListItem({ ticket }) {
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

export default TicketList;
