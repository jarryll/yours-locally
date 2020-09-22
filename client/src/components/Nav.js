import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import Logout from './Logout';
import '../App.css';

function Nav({ match }) {

  const [loggedIn, setLoggedIn] = useState(false)
  useEffect(() => {
    if (Cookies.get('logIn')) {
      setLoggedIn(true);
    } else setLoggedIn(false)
  }, []);

  // let userId = Cookies.get('user');
  let sellerId = Cookies.get('random');
  let userId = Cookies.get('user');


if(loggedIn) {
        return (
              <nav className="site-header sticky-top py-1 bg-dark">
                <div className="container d-flex flex-column flex-md-row justify-content-between text-light">
                  <h3>Welcome, {Cookies.get('username')}</h3>
                  <Link to='/' className="py-2 d-none d-md-inline-block text-light" id="link1">Home</Link>
                  <Link to='/shopByCategory' className="py-2 d-none d-md-inline-block text-light"  id="link2" >Shop By Category</Link>

                
        
                   {sellerId ? <Link to ={`/inbox/${sellerId}`} className="py-2 d-none d-md-inline-block text-light"  id="link3">Inbox</Link> : null } 

                  {userId ? <Link to ={`/inbox/user/${userId}`} className="py-2 d-none d-md-inline-block text-light"  id="link3">Inbox</Link>: null}
              

                  <Link to ='/favourites' className="py-2 d-none d-md-inline-block text-light" id="link4">Your favourites</Link>
                  <Logout />
                </div>
              </nav>
    )

  } else if (!loggedIn) {
    return (
      <nav className="site-header sticky-top py-1 bg-dark">
        <div className="container d-flex flex-column flex-md-row justify-content-around text-light">
          <Link to='/' className="py-2 d-none d-md-inline-block text-light" id="link1">Home</Link>
          <Link to='/shopByCategory' className="py-2 d-none d-md-inline-block text-light" id="link2" >Shop By Category</Link>
          <Link to='/login' className="py-2 d-none d-md-inline-block text-light btn btn-outline-success">Login</Link>
          <Link to="/register" className="py-2 d-none d-md-inline-block text-light btn btn-outline-primary" >Register</Link>
        </div>
      </nav>
    )
  }
}

export default Nav