import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { 
  startAddExpense, 
  addExpense, 
  editExpense,   
  startRemoveExpense,
  removeExpense, 
  startSetExpenses,
  setExpenses
  } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);
//=== beforeEach() ==============================================
// need to create persistent test data 
// need .done() bc this is async so beforeEach() won't run till data has synced
beforeEach((done) => { // pass in done here
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => { // expense destructured
    expensesData[id] = { description, note, amount, createdAt }; // already destructured, using shorthand
  });
  database.ref('expenses').set(expensesData).then(() => done());  // wait for done()
});
//===============================================================


//=== ADD_EXPENSE ===============================================
test('should setup add expense action object with provided values', () => {
  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2]
  });
});

test('should add expense to database and store', (done) => {
  const store = createMockStore({});
  const expenseData = {
    description: 'Mouse',
    amount: 3000,
    note: 'This one is better',
    createdAt: 1000
  };

  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    });
    return database.ref(`expenses/${actions[0].expense.id}`).once('value');

  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseData);
    done();
  });
});

test('should add expense with defaults to database and store', (done) => {
  const store = createMockStore({});
  const expenseDefaults = {
    description: '',
    amount: 0,
    note: '',
    createdAt: 0
  };

  store.dispatch(startAddExpense( {} )).then( () => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseDefaults
      }
    });
    return database.ref(`expenses/${actions[0].expense.id}`).once('value');

  } ).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseDefaults);
    done();
  });
});

//=== SET_EXPENSES ==============================================
test('should setup set expense action object with data', () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  })
});

test('should fetch the expenses from firebase', (done) => {
  const store = createMockStore({});
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses
    });
    done();
  });
});


//=== REMOVE_EXPENSE ============================================
// Note: if this isn't the last test in the file, the expense will
//   be removed BUT replaced with other tests, such as ADD_EXPENSE
//   fbs color = red, but same # of expenses will be the end result as
//   the tests run.
test('should setup remove expense action object', () => {
  const action = removeExpense({ id: '123abc' });
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  });
});

test('should remove expense from firebase', (done) => {
  const store = createMockStore({});
  const id = expenses[2].id;
  store.dispatch(startRemoveExpense({ id })).then(() => {
    const actions = store.getActions(); // returned from startRemoveExpense
    expect(actions[0]).toEqual({
      type: 'REMOVE_EXPENSE',
      id
    });
    return database.ref(`expenses/${id}`).once('value');
  }).then((snapshot) => {  // use snapshot to make sure it was actually deleted
    expect(snapshot.val()).toBeFalsy(); // return value s/b null
    done();
  });
});

//=== EDIT_EXPENSE ==============================================
// test('should setup edit expense action object', () => {
//   const action = editExpense('123abc', { note: 'New note value' });
//   expect(action).toEqual({
//     type: 'EDIT_EXPENSE',
//     id: '123abc',
//     updates: {
//       note: 'New note value'
//     }
//   });
// });