import React, { useState, useEffect }  from 'react';

function RegisterSeller() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const handleClick = async (e) => {
        e.preventDefault();
     try{
        const body = {username, password}
        const response = await fetch("/seller/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
          });
        console.log(response)
        window.location = '/seller/login'
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
     <h3> Seller Registration Page </h3>
         <label htmlFor="username">Username</label>
         <input type="text" required minLength='4'maxLength="12" id="username" onChange={(e) => handleUsernameChange(e)}/>
         <label htmlFor="password">Password</label>
         <input type="password" required minLength='4'maxLength="12" id="password" onChange={(e) =>  handlePasswordChange(e)}/>
         <br/> <h5>Please Enter Desired Username and Password. Between 4-12 characters for both fields </h5><br/>
        <input type="submit" />
     </form>
    )
}
export default RegisterSeller