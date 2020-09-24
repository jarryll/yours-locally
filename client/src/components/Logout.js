import React from 'react';
import Cookies from 'js-cookie';

function Logout() {

        const handleClick = (e) => {
                e.preventDefault();
                Cookies.remove('logIn');
                Cookies.remove('random');
                Cookies.remove('type');
                Cookies.remove('id');
                Cookies.remove('user');
                Cookies.remove('username');
                window.location = '/';
        }

        return (
                <button type="button" className="btn btn-outline-warning" onClick={(e) => handleClick(e)}>Log Out</button>
        )
}

export default Logout