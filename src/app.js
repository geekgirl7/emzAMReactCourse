import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { login, logout } from './actions/auth';
import {startSetExpenses} from './actions/expenses';
import getVisibleExpenses from './selectors/expenses';
import LoadingPage from './components/LoadingPage';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import {firebase} from './firebase/firebase'; // for using googleAuthProvider:

// for testing firebase:
// comment out if not testing fbs!
// import './firebase/firebase';

// for testing promises:
//import './playground/promises'; 

const store=configureStore();

const jsx=(
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if(!hasRendered) {
    ReactDOM.render( jsx,document.getElementById( 'app' ));
    hasRendered = true;
  }
};

// This will display *until* all the expenses are loaded
//  ReactDOM.render( <p>Loading...</p>,document.getElementById( 'app' ));
  ReactDOM.render(<LoadingPage />,document.getElementById( 'app' ));

// take this out after testing:
//renderApp();

// firebase auth code for googleAuthProvider
// runs the callback with 'auth has changed' (c/use for testing the connection):
firebase.auth().onAuthStateChanged( ( user ) => {
  if( user ) {
    // *After* they're logged in, *then* we'll load the Expensify app
    store.dispatch(login(user.uid));
    store.dispatch( startSetExpenses() ).then(() => {
      renderApp();
      if(history.location.pathname === '/') {
        history.push('/dashboard');
      }
    });
  } else {
    store.dispatch(logout()); // no args needed
    renderApp();
    history.push( '/' ); // logout: bring user back to login
    //console.log('uid logout', user.uid);
  }
});

