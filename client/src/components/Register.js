import React, { useState, useEffect }  from 'react';

function Register() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const handleClick = async (e) => {
        e.preventDefault();
     try{
        const body = {username, password}
        const response = await fetch("/shops/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
          });
        console.log(response)
        window.location = '/'
     } catch (err) {
        throw new Error ("ERRORRRR")
     }
    }
    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }
    return (
     <form onSubmit={(e) => handleClick(e)} >
         <label htmlFor="username">Username</label>
         <input type="text" required id="username" onChange={(e) => handleUsernameChange(e)}/>
         <label htmlFor="password">Password</label>
         <input type="password" required id="password" onChange={(e) => handlePasswordChange(e)}/>
        <input type="submit" />
     </form>
    )
}
export default Register