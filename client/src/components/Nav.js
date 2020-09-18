import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import Logout from './Logout';

function Nav() {

const [loggedIn, setLoggedIn] = useState(false)
useEffect(() => {
    if(Cookies.get('logIn')){
       setLoggedIn(true);
    } else setLoggedIn(false)
}, []);


    if(loggedIn){
        return (
        <nav>
            <ul className="nav-links">
                <h3>Logo goes here</h3>
                <Link to = '/'>
                    <li>Home</li>
                </Link>
                <Link to ='/shopByCategory'>
                    <li>Shop by category</li>
                </Link>
                        <li><Logout /></li>


            </ul>
        </nav>
    )
    } else if(!loggedIn){
        return (
            <nav>
                <ul className="nav-links">
                    <h3>Logo goes here</h3>
                    <Link to = '/'>
                        <li>Home</li>
                    </Link>

                    <Link to ='/shopByCategory'>
                        <li>Shop by category</li>
                    </Link>

                    <Link to ='/login'>
                        <li>Sign in</li>
                    </Link>

                    <Link to="/register">
                        <li>Register</li>
                    </Link>

                </ul>
            </nav>
        )
    }

}

export default Nav