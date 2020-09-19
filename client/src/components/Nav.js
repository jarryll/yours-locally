import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import Logout from './Logout';

function Nav({match}) {

const [loggedIn, setLoggedIn] = useState(false)
useEffect(() => {
    if(Cookies.get('logIn')){
       setLoggedIn(true);
    } else setLoggedIn(false)
}, []);

let userId = Cookies.get('user');
let sellerId = Cookies.get('random');
console.log(match)
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
                <Link to ='/favourites'>
                    <li>Your favourites</li>
                </Link>

                {sellerId ? <Link to ={`/inbox/${sellerId}`}>
                                    <li>Inbox</li>
                                </Link> : null}

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

                    <Link to ='/seller/login'>
                        <li>Sign in as Seller</li>
                    </Link>

                    <Link to ='/user/login'>
                        <li>Sign in as User</li>
                    </Link>

                    <Link to="/seller/register">
                        <li>Register as Seller</li>
                    </Link>

                    <Link to="/user/register">
                        <li>Register as User</li>
                    </Link>
                </ul>
            </nav>
        )
    }

}

export default Nav