import React from 'react';
import './App.css';
import Nav from './Nav';
import ShopByCategory from './ShopByCategory';
import Register from './Register';
import Home from './Home';
import Login from './Login';
import ShopDetail from './ShopDetail';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/shopByCategory" exact component ={ShopByCategory} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/shops/:id" component={ShopDetail}/>
        </Switch>
     </div>
    </Router>

  );
}

export default App;
