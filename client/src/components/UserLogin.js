import React, { useState } from 'react';

const UserLogin = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    // const [type, setType] = useState("")
    const [errorMessage, setErrorMessage] = useState('')
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const body = { username, password }
            const response = await fetch("/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            const verify = await response.json();
            if (verify.result) {
                setErrorMessage(`${verify.result}`)
                setUsername('')
                setPassword('')
            } else {
                window.location = '/'
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
    // const handleTypeChange = (e) => {
    //     setType(e.target.value)
    // }


    return (
        <div class="col-md-6 login-form-1">
            <h3>Login as User</h3>
            <form onSubmit={(e) => handleClick(e)}>
                <div class="form-group">
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Your Username *"
                        value={username}
                        required
                        onChange={(e) => handleUsernameChange(e)}
                    />
                </div>
                <div class="form-group">
                    <input
                        type="password"
                        class="form-control"
                        placeholder="Your Password *"
                        value={password}
                        required
                        onChange={(e) => handlePasswordChange(e)}
                    />
                </div>
                <div class="form-group">
                    <input type="submit" class="btnSubmit" value="Login" />
                </div>
                <h5 style={{ color: 'red' }}>{errorMessage}</h5>
            </form>
        </div>
    )

}
export default UserLogin