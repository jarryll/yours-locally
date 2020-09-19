import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import Logout from './Logout';
import  '../App.css';

function Nav({match}) {

const [loggedIn, setLoggedIn] = useState(false)
useEffect(() => {
    if(Cookies.get('logIn')){
       setLoggedIn(true);
    } else setLoggedIn(false)
}, []);

let sellerId = Cookies.get('random');
console.log(match)
    if(loggedIn){
        return (
<nav class="site-header sticky-top py-1 bg-dark">
  <div class="container d-flex flex-column flex-md-row justify-content-between text-light">
    <Link to='/' className="py-2 d-none d-md-inline-block text-light" id="link1">Home</Link>
    <Link to='/shopByCategory' className="py-2 d-none d-md-inline-block text-light"  id="link2" >Shop By Category</Link>
    {sellerId ? <Link to ={`/inbox/${sellerId}`} className="py-2 d-none d-md-inline-block text-light"  id="link3">Inbox</Link> : null}
    <Logout />

  </div>
</nav>
    )
    } else if(!loggedIn){
        return (
    <nav class="site-header sticky-top py-1 bg-dark">
      <div class="container d-flex flex-column flex-md-row justify-content-between text-light">
        <Link to='/' className="py-2 d-none d-md-inline-block text-light"  id="link1">Home</Link>
        <Link to='/shopByCategory' className="py-2 d-none d-md-inline-block text-light"  id="link2" >Shop By Category</Link>
        <Link to ='/seller/login' className="py-2 d-none d-md-inline-block text-light"  id="link3">Sign in as Seller</Link>
        <Link to ='/user/login' className="py-2 d-none d-md-inline-block text-light"  id="link4">Sign in as User</Link>
        <Link to="/seller/register" className="py-2 d-none d-md-inline-block text-light"  id="link5">Register as Seller</Link>
        <Link to="/user/register" className="py-2 d-none d-md-inline-block text-light"  id="link6">Register as User</Link>
      </div>
    </nav>
        )
    }

}

export default Nav