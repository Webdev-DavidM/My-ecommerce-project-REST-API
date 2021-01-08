import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import Navbar from './Components/NavBar';

// Here I am using lazy loading which is code splitting which will only loads components when needed and
// hopefully should speed up my application
const LandingPage = lazy(() => import('./Pages/LandingPage'));
const Account = lazy(() => import('./Pages/Account'));
const Admin = lazy(() => import('./Pages/Admin'));
const SignIn = lazy(() => import('./Pages/SignIn'));
const Product = lazy(() => import('./Pages/Product'));
const ShoppingBasket = lazy(() => import('./Pages/ShoppingBasket'));
const Category = lazy(() => import('./Pages/Category'));

const NotFound = lazy(() => import('./Components/NotFound'));

function App() {
  // The checkout is a nested route within the shopping-basket component so the only way you can get it is is via the sopping basket. This is correct as
  // you shouldnt be able to get to the checkout unless you have something in your shopping basket.
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path='/' component={LandingPage} />
            <Route exact path='/sign-in' component={SignIn} />
            <Route exact path='/account' component={Account} />
            <Route exact path='/admin' component={Admin} />
            <Route exact path='/product/:id' component={Product} />
            <Route exact path='/shopping-basket' component={ShoppingBasket} />
            <Route exact path='/:category/:type' component={Category} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
