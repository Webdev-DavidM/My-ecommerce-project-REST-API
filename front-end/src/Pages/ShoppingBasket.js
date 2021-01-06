import React from 'react';
import { Link, Route, BrowserRouter as Router } from 'react-router-dom';
import CheckOut from '../Pages/CheckOut';

const ShoppingBasket = ({ match }) => {
  console.log(match);
  return (
    <div>
      <Router>
        <Link to={`${match.url}/checkout`}>Checkout</Link>
        <Route path={`${match.url}/checkout`} component={CheckOut} />
      </Router>
    </div>
  );
};

export default ShoppingBasket;
