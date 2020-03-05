import React, {useState, useEffect } from 'react';
import axiosWithAuth from '../axiosWithAuth';
import Ticket from './Ticket';

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
                <Ticket key={ticket.id} ticket={ticket} />
            ))}
        </div>
    );
}

export default TicketList;