import React, { useState } from 'react';

function RegisterUser() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const body = { username, password }
            const response = await fetch("/user/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            console.log(response)
            window.location = '/login'
        } catch (err) {
            throw new Error("ERRORRRR")
        }
    }
    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }
    return (
        <div class="col-md-6 login-form-1">
            <h3>Register as User</h3>
            <form onSubmit={(e) => handleClick(e)}>
                <div class="form-group">
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Your Username *"
                        value={username}
                        required
                        minLength='4'
                        maxLength="12"
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
                        minLength='4'
                        maxLength="12"
                        onChange={(e) => handlePasswordChange(e)}
                    />
                </div>
                <div class="form-group">
                    <input type="submit" class="btnSubmit" value="Register" />
                </div>
            </form>
        </div>
    )
}
export default RegisterUser