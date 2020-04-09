import uuid from 'uuid';
import database from '../firebase/firebase';

// steps our code is (now) taking: 
// component calls action generator
// action generator returns object
// component distpatches object
// redux store changes

// steps our code will take after modifying for firebase (async):
// components call action generator
// action generator returns *function*
// component dispatches function (?)
// function runs (has the ability to dispatch other actions
//   and do whatever it wants)

// ADD_EXPENSE
export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense
});

// this will return the thing that gets dispatched
export const startAddExpense = (expenseData = {}) => {
  return (dispatch) => {
    // destructure from expenseData:
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0
    } = expenseData;

    // need to .push() an OBJECT.  Can define it in the call below
    // OR
    // create a const and pass it in, like so:
    const expense = { description, note, amount, createdAt };
    
    // Need to save expense to fbs AND dispatch addExpense,
    //  otherwise, the Redux store will never change
    // This is where the *actual object* is set:
    return database.ref('expenses').push(expense).then((ref) => {
      dispatch(addExpense({
        id: ref.key,
        ...expense
      }));
    });
  };
};

// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});