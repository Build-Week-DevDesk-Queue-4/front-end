import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../contexts/UserContext';
import TicketContext from '../contexts/TicketContext';
import TicketList from './TicketList';
import CreateTicket from './CreateTicket';
import useLocalStorage from '../hooks/useLocalStorage';
import axiosWithAuth from '../axiosWithAuth';

const getSortRank = ticket => {
    if (!ticket.solved) {
        switch (ticket.urgency) {
            case "low":
                return 1;
            case "medium":
                return 2;
            case "high":
                return 3;
        }
    }
    return 0;
}

export default props => {
    const [tickets, setTickets] = useState([]);
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState(false);
    const fetchTickets = () => {
        setFetching(true);
        axiosWithAuth().get('https://daniels-dev-desk-backend.herokuapp.com/api/tickets')
            .then(response => {
                setTickets(response.data.tickets.sort((a,b) => getSortRank(b) - getSortRank(a)));
                setFetching(false);
            })
            .catch(error => {
                console.error(error.response);
                setError(true);
                setFetching(false);
            });
    }
    const [ticketChoice, setTicketChoice] = useLocalStorage("ticketListType", "all");
    const {user} = useContext(UserContext);

    useEffect(fetchTickets, []);

    return (
        <div>
            <TicketContext.Provider value={{
                tickets, setTickets: fetchTickets, fetching, setFetching, error, setError
            }}>
                {user.username} is a {user.type}
                <CreateTicket/>
                <button onClick={() => setTicketChoice("all")}>All Tickets</button>
                <button onClick={() => setTicketChoice("my")}>My Tickets</button>
                {ticketChoice === "all" && <TicketList tickets={tickets}/>}
                {ticketChoice === "my" &&
                    <TicketList tickets={tickets} filter={(ticket) => ticket.user_id === user.id}/>
                }
            </TicketContext.Provider>
        </div>
    )
}