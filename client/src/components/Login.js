import React, { useState, useEffect }  from 'react';
import Cookies from 'js-cookie';
import sha256 from 'js-sha256';
import {withRouter} from 'react-router-dom';

function Login(props) {
    const SALT = "homebasedbusiness123";
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [type, setType] = useState("")
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const handleClick = async (e) => {
        e.preventDefault();
     try{
        const body = {username, password}
        const response = await fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
          });
        if(Cookies.get('id')=== sha256(`${SALT}${Cookies.get('random')}`)){
            props.history.push(`/`)
        }
     } catch (err) {
        throw new Error ("error")
     }
    }
    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }
    const handleTypeChange = (e) => {
        setType(e.target.value)
    }
    return (
     <form onSubmit={(e) => handleClick(e)} >
         <label htmlFor="username">Username</label>
         <input type="text" required id="username" onChange={(e) => handleUsernameChange(e)}/>
         <label htmlFor="password">Password</label>
         <input type="password" required id="password" onChange={(e) => handlePasswordChange(e)}/>
         <select onChange={(e)=> handleTypeChange(e)}>
         <option value="user">User</option>
         <option value="seller">Seller</option>
         </select>
        <input type="submit" />
     </form>
    )
}
export default withRouter(Login)