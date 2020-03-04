import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Ticket = (props) => {
    const [ticket, setTicket] = useState();

    useEffect(() => {
        const id = props.match.params.id

        axios
        .get('https://daniels-dev-desk-backend.herokuapp.com/')
        .then(response => {
            console.log(response.data);
            setTicket(response.data);
        })
        .catch(error => {
            console.error(error);
        })
    });

},[props];

if (!ticket) {
    return <div>Loading tickets</div>
}