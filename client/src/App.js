import React from 'react';
import './App.css';
import Nav from './components/Nav';
import ShopByCategory from './components/ShopByCategory';
import Home from './components/Home';
import Logout from './components/Logout';
import ShopDetail from './components/ShopDetail';
import Inbox from './components/Inbox';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/shopByCategory" exact component ={ShopByCategory} />
          <Route path="/login" exact component ={Login} />
          <Route path="/register" exact component ={Register} />
          <Route path="/shop/:id" component={ShopDetail}/>
          <Route path="/inbox/:seller_id" component={Inbox} />
          <Route path='/logout' component={Logout} />
        </Switch>
     </div>
    </Router>

  );
}

export default App;
