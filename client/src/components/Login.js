import React, { useState, useEffect }  from 'react';
import Cookies from 'js-cookie';
import sha256 from 'js-sha256';
import {withRouter} from 'react-router-dom';

function Login(props) {
    const SALT = "homebasedbusiness123";
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [type, setType] = useState("")
    const [errorMessage, setErrorMessage] = useState('')
    const handleClick = async (e) => {
        e.preventDefault();
     try{
        const body = {username, password,type}
        const response = await fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
          });
        const verify = await response.json();
        if(verify.result){
            setErrorMessage(`${verify.result}`)
            setUsername('')
            setPassword('')

        } else {
            window.location='/'
        }
     } catch (err) {
        console.log(err)
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
         <input type="text" required id="username" value={username} onChange={(e) => handleUsernameChange(e)}/>
         <label htmlFor="password">Password</label>
         <input type="password" required id="password" value={password} onChange={(e) => handlePasswordChange(e)}/>
         <select onChange={(e)=> handleTypeChange(e)}>
         <option value="user">User</option>
         <option value="seller">Seller</option>
         </select>
        <input type="submit" /> <br/> <br/>
        <h3 style={{color:'red'}}>{errorMessage}</h3>
     </form>
    )

}
export default withRouter(Login)