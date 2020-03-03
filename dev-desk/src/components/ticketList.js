import React, {useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TicketList = props => {
    const [tickets, setTickets] = useState([])
    useEffect(() => {
        const getTickets = () => {
            axios
            .get('')
            .then(response => {
                setTickets(response.data);
            })
            .catch(error => {
                console.error('Server Error', error);
            });
        }

        getTickets();
}, []);

return (
    <div className="ticket-list">
        {tickets.map(ticket => (

            <TicketListItem key={ticket.id} ticket={ticket} />
        ))}
    </div>
);
 }

function TicketListItem({ ticket }) {
    const { user_id, description, urgency, reply, solved, category, solved_by } =ticket;
    return (
        <Link to={'tickets/${ticket.id}'}>
            <div className="ticketCard">
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
