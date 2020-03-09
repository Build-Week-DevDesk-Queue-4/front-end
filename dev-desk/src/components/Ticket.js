import React, { useState, useContext } from 'react';
import UserContext from '../contexts/UserContext';
import ResolveTicket from './ResolveTicket';
import axiosWithAuth from '../axiosWithAuth';
import TicketContext from '../contexts/TicketContext';

function Ticket({ ticket }) {
    const {user} = useContext(UserContext);
    const {setTickets} = useContext(TicketContext);
    const { username, description, urgency, reply, solved, category, solved_by } =ticket;
    const [editing, setEditing] = useState(false);

    const canClick = user.type === "admin";

    const getClasses = () => {
        let cls = "ticket";
        if (solved) {
            cls += " closed";
        }
        if (canClick) {
            cls += " clickable";
        }
        return cls
    }

    const deleteTicket = e => {
        e.preventDefault();
        e.stopPropagation();
        if (user.type !== "admin" && user.id !== ticket.user_id) {
            return;
        }
        axiosWithAuth().delete(`https://daniels-dev-desk-backend.herokuapp.com/api/tickets/${ticket.id}`)
            .then(setTickets)
            .catch(err => console.log(err.response));
    }

    return (
        <div>
            <div className={getClasses()} onClick={() => setEditing(canClick)}>
                <p className='top'>
                    <span>
                        <span className='username'>{username}</span>
                        {(user.id === ticket.user_id || user.type === 'admin') &&
                            <button onClick={deleteTicket} className='delete'>Delete</button>
                        }
                    </span>
                    {!solved && <span className={`urgency-${urgency}`}>urgency: {urgency}</span>}
                </p>
                <h2>{category}</h2>
                <p>{description}</p>
                {solved === true &&
                <div className='solution'>
                    <p>Solution: {reply}</p>
                    <p>solved by: {solved_by}</p>
                </div>}
            </div>
            {editing && <ResolveTicket ticket={ticket} setEditing={setEditing}/>}
        </div>
    )
}

export default Ticket;