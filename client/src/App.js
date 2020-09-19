import React from 'react';
import './App.css';
import Nav from './components/Nav';
import ShopByCategory from './components/ShopByCategory';
import RegisterSeller from './components/RegisterSeller';
import Home from './components/Home';
import SellerLogin from './components/SellerLogin';
import RegisterUser from './components/RegisterUser';
import UserLogin from './components/UserLogin';
import Logout from './components/Logout';
import ShopDetail from './components/ShopDetail';
import Inbox from './components/Inbox';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/shopByCategory" exact component ={ShopByCategory} />
          <Route path="/seller/login" component={SellerLogin} />
          <Route path="/seller/register" component={RegisterSeller} />
          <Route path="/user/login" component={UserLogin} />
          <Route path="/user/register" component={RegisterUser} />
          <Route path="/shop/:id" component={ShopDetail}/>
          <Route path="/inbox/:seller_id" component={Inbox} />
          <Route path='/logout' component={Logout} />
        </Switch>
     </div>
    </Router>

  );
}

export default App;
