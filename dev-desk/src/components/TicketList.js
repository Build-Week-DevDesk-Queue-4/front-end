import React, {useState, useEffect } from 'react';
import axiosWithAuth from '../axiosWithAuth';
import Ticket from './Ticket';
import loading from '../image/loading.gif';

const TicketList = ({filter}) => {
    const [tickets, setTickets] = useState([]);
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState(false);

    if (filter === undefined) {
        filter = () => true;
    }

    useEffect(() => {
        setFetching(true);
        axiosWithAuth().get('https://daniels-dev-desk-backend.herokuapp.com/api/tickets')
            .then(response => {
                console.log(response);
                setTickets(response.data.tickets);
                setFetching(false);
            })
            .catch(error => {
                console.error(error.response);
                setError(true);
                setFetching(false);
            });
    }, []);

    return (
        <div className="ticket-list">
            {fetching && 
                <img src={loading} alt="loading..." width="32" height="32"/>
            }
            {error && !fetching && <p>Server Error</p>}
            {tickets.filter(filter).map(ticket => (
                <Ticket key={ticket.id} ticket={ticket} />
            ))}
        </div>
    );
}

export default TicketList;