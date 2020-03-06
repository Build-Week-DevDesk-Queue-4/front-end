import React, {useContext } from 'react';
import Ticket from './Ticket';
import TicketContext from '../contexts/TicketContext';
import loading from '../image/loading.gif';

const TicketList = ({filter}) => {
    const {tickets, fetching, error} = useContext(TicketContext);

    if (filter === undefined) {
        filter = () => true;
    }

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