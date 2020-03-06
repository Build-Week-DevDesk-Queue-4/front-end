import React, { useContext, useState } from 'react';
import UserContext from '../contexts/UserContext';
import TicketList from './TicketList';
import CreateTicket from './CreateTicket';

export default props => {
    const [ticketChoice, setTicketChoice] = useState("all");
    const {user} = useContext(UserContext);

    return (
        <div>
            {user.username} is a {user.type}
            <CreateTicket/>
            <button onClick={() => setTicketChoice("all")}>All Tickets</button>
            <button onClick={() => setTicketChoice("my")}>My Tickets</button>
            {ticketChoice === "all" && <TicketList/>}
            {ticketChoice === "my" && <TicketList filter={(ticket) => ticket.user_id === user.id}/>}
        </div>
    )
}