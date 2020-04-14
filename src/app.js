import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

// for using googleAuthProvider:
import { firebase } from './firebase/firebase';

// for testing firebase:
// comment out if not testing fbs!
// import './firebase/firebase';

// for testing promises:
//import './playground/promises'; 

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

// This will display *until* all the expenses are loaded
ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

// *After* they're loaded, *then* we'll load the Expensify app
store.dispatch(startSetExpenses()).then(() => {
  ReactDOM.render(jsx, document.getElementById('app'));
});

// firebase auth code for googleAuthProvider
// runs the callback with auth has changed (c/use for testing the connection):
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log('log in');
  } else {
    console.log('log out');
  }
});

