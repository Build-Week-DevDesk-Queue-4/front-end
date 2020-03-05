import React, { useContext, useState } from 'react';
import UserContext from '../contexts/UserContext';

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
            console.log("I'm supposed to make an API PUT request here with this new data:", {
                ...ticket,
                reply,
                solved_by: user.id,
                solved: true,
            });
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