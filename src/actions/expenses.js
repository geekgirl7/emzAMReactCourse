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

//===============================================================
// ADD_EXPENSE
export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense
});

// this will return the thing that gets dispatched
export const startAddExpense = (expenseData = {}) => {
  // add a second arg to thunk:
  //  They actually both get called, but if we add getState 
  //  we can now reference the current state
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
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
    return database.ref(`users/${uid}/expenses`).push(expense).then((ref) => {
      dispatch(addExpense({
        id: ref.key,
        ...expense
      }));
    });
  };
};

//===============================================================
// SET_EXPENSES: 
// will *actually* manipulate the Redux store
export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses
}); 

// This one *almost* worked!
// Should have used .once(),  NOT .on()
// export const startSetExpenses = () => {
//   return (dispatch) => {
//   database.ref('expenses').on('value', (snapshot)=> {
//       const expenses = [];
//
//       snapshot.forEach((childSnapshot) => {
//         expenses.push({
//           id: childSnapshot.key,
//           ...childSnapshot.val()
//         });
//       });
//       console.log('startSetExpenses: ', expenses);
//         dispatch(setExpenses(expenses));
//     });   
//   };
// };

// andrew's solution:
export const startSetExpenses = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/expenses`).once('value').then((snapshot)=> {
      const expenses = [];

      snapshot.forEach((childSnapshot) => {
        expenses.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      //console.log('startSetExpenses: ', expenses);
      dispatch(setExpenses(expenses));
    });   
  };
};

//===============================================================
// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

export const startRemoveExpense = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/expenses/${id}`).remove().then(() => {
      dispatch(removeExpense({id}));
    });
  };
};

//===============================================================
// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

export const startEditExpense = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/expenses/${id}`)
      .update(updates)
      .then( () => {
        dispatch(editExpense(id, updates));
    });
  };
};


// startX boilerplate:
// export const startX = (ais) => {
//    return (dispatch) = () => {
//       return database.ref(location)
//       .CRUD_op()
//       .then( () => {
//         dispatch(original action item)
//       });  
//     };
//  };

// 1: export const startX = (action item sig) => {};

// 2: export const startX = (ais) => {
//    return (dispatch) = () => {};
//  };

// 3: export const startX = (ais) => {
//    return (dispatch) = () => {
//       return database.ref(location).CRUD_op().then();  
//     };
//  };

// 4: export const startX = (ais) => {
//    return (dispatch) = () => {
//       return database.ref(location).CRUD_op().then( () => {
//         dispatch(original action item)
//       });  
//     };
//  };