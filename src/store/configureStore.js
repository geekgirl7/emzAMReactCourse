import thunk from 'redux-thunk'; // import 3rd party first
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';
import authReducer from '../reducers/auth';

// To preserve use of DevTools after adding redux=thunk:
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store=createStore(
    combineReducers({
      expenses: expensesReducer,
      filters: filtersReducer,
      auth: authReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};

// Original code:
// // This is where we pull everything together: 
// //   imports + the store itself

// // wrap the createStore function in another function to
// //  make it easy to export:
// export default () => {
//   const store=createStore(
//     combineReducers({
//       expenses: expensesReducer,
//       filters: filtersReducer
//     }),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   );
//   return store;
// };

