import React, { useState, useEffect }  from 'react';
import Cookies from 'js-cookie';

const UserLogin = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [type, setType] = useState("")
    const [errorMessage, setErrorMessage] = useState('')
    const handleClick = async (e) => {
        e.preventDefault();
     try{
        const body = {username, password,type}
        const response = await fetch("/user/login", {
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
        <h3> User Login Page </h3>
         <label htmlFor="username">Username</label>
         <input type="text" required id="username" value={username} onChange={(e) => handleUsernameChange(e)}/>
         <label htmlFor="password">Password</label>
         <input type="password" required id="password" value={password} onChange={(e) => handlePasswordChange(e)}/>
        <input type="submit" /> <br/> <br/>
        <h3 style={{color:'red'}}>{errorMessage}</h3>
     </form>
    )

}
export default UserLogin