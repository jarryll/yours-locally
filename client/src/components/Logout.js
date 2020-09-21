import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import sha256 from 'js-sha256';
import { withRouter } from 'react-router-dom';

function Logout(props) {

        const handleClick = (e) => {

                e.preventDefault();
                Cookies.remove('logIn');
                Cookies.remove('random');
                Cookies.remove('type');
                Cookies.remove('id');
                Cookies.remove('user_id');
                window.location = '/';
        }

        return (
                <button onClick={(e) => handleClick(e)}>Log Out</button>
        )
}

export default Logout