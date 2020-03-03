import React, { useContext } from 'react';
import UserContext from '../contexts/UserContext';

export default props => {
    const {user} = useContext(UserContext);

    return (
        <div>
            {user.username} is a {user.type}
        </div>
    )
}