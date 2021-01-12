import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import LandingPage from './Pages/LandingPage';
import React, { Component } from 'react';
import Navbar from './Components/NavBar';
import { CSSTransition } from 'react-transition-group';
import { CircularProgress } from '@material-ui/core';

// Here I am using lazy loading which is code splitting which will only loads components when needed and
// hopefully should speed up my application

const Account = lazy(() => import('./Pages/Account'));
const Admin = lazy(() => import('./Pages/Admin'));
const SignIn = lazy(() => import('./Pages/SignIn'));
const Product = lazy(() => import('./Pages/Product'));
const ShoppingBasket = lazy(() => import('./Pages/ShoppingBasket'));
const Category = lazy(() => import('./Pages/Category'));
const NotFound = lazy(() => import('./Components/NotFound'));
const CategoryArea = lazy(() => import('./Pages/CategoryArea'));

export default class App extends Component {
  state = {
    showArrowToTop: false,
  };
  componentDidMount = () => {
    window.addEventListener('scroll', () => {
      console.log(window.innerHeight, window.scrollY);
      if (window.scrollY > 122) {
        this.setState({ showArrowToTop: true });
      }
      console.log(window.innerHeight - 122);
      if (window.innerHeight - 122 < window.innerHeight - window.scrollY) {
        this.setState({ showArrowToTop: false });
      }
    });
  };

  render() {
    return (
      <div>
        <div className='App'>
          <Router>
            <Navbar />
            <Suspense
              fallback={
                <div className='spinner-container'>
                  <CircularProgress
                    style={{
                      color: '#f1c40f',
                      size: '4rem',
                    }}></CircularProgress>
                </div>
              }>
              <Switch>
                <Route exact path='/' component={LandingPage} />
                <Route exact path='/sign-in' component={SignIn} />
                <Route exact path='/account' component={Account} />
                <Route exact path='/admin' component={Admin} />
                <Route exact path='/product/:id' component={Product} />
                <Route
                  exact
                  path='/shopping-basket'
                  component={ShoppingBasket}
                />
                <Route exact path='/:category/:type' component={CategoryArea} />
                <Route exact path='/:category' component={Category} />
                <Route component={NotFound} />
              </Switch>
            </Suspense>
          </Router>
          <CSSTransition
            in={this.state.showArrowToTop}
            onClick={() => window.scrollTo(0, 0)}
            timeout={1000}
            classNames='menuarrow'
            unmountOnExit>
            <div className='menuarrow'>
              <i class='fas fa-arrow-circle-up'></i>
            </div>
          </CSSTransition>
        </div>
      </div>
    );
  }
}
