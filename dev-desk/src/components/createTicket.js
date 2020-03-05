import React from 'react';

export default createTicket() {
    const [createTicket, setCreateTicket] = useState({
        user_id: ,
        description: "",
        urgency: "",
        reply: "",
        solved: false,
        category: "",
        solved_by: "",
        username: ""
    });

}
return(
    <div>
        <form onSubmit = {handleSubmit}>
            <input
                name= 'user_id'
                type= 'text'
                value= ''
                onChange= ''
            />
            <input
                name= 'description'
                type= 'text'
                value= ''
                onChange= ''
            />
            <input
                name= 'category'
                type= 'text'
                value= ''
                onChange= ''
            />
            <input
                name= 'reply'
                type= ''
                value= ''
                onChange= ''
            />
            <input
                name= 'solved'
                type= ''
                value= ''
                onChange= ''
            />  
            <input
                name= 'category'
                type= ''
                value= ''
                onChange= ''
            />
            <input
                name= 'solved_by'
                type= ''
                value= ''
                onChange= ''
            />
            <input
                name= 'username'
                type= ''
                value= ''
                onChange= ''
            />
            <button type= 'submit'>Submit</button>
        </form>
    </div>
