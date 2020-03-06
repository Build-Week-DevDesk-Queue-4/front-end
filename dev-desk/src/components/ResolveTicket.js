import React, { useContext, useState } from 'react';
import UserContext from '../contexts/UserContext';
import axiosWithAuth from '../axiosWithAuth';

export default ({ticket, setEditing}) => {
    const {user} = useContext(UserContext);
    const [reply, setReply] = useState("");

    const handleSubmit = ev => {
        ev.preventDefault();
        if (ev.target.name === "cancel") {
            setEditing(false);
            return;
        } else {
            setEditing(false);
            axiosWithAuth().put(`https://daniels-dev-desk-backend.herokuapp.com/api/tickets/${ticket.id}`, {
                ...ticket,
                reply,
                // For some reason this errors the API PUT request so I'll exclude it
                // solved_by: user.username,
                solved: true,
            }).then(console.log)
                .catch(console.error);
        }
    }

    return <form onSubmit={handleSubmit}>
        <label>Reply:</label>
        <textarea
            value={reply}
            onChange={ev => setReply(ev.target.value)}
        />
        <button
            name="submit"
            className="submit"
        >
            Submit
        </button>
        <button
            name="cancel"
            className="cancel"
        >
            Cancel
        </button>
    </form>
}