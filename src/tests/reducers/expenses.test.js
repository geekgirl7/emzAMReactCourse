import moment from 'moment';
import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set default state',() => {
  const state=expensesReducer(undefined,{type: '@@INIT'});
  expect(state).toEqual([]);
});

test('should remove expense by id',() => {
  const action={
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id
  };
  const state=expensesReducer(expenses,action);
  expect(state).toEqual([expenses[0],expenses[2]]);
});

test('should not remove expenses if id not found',() => {
  const action={
    type: 'REMOVE_EXPENSE',
    id: '-1'
  };
  const state=expensesReducer(expenses,action);
  expect(state).toEqual(expenses);
});

// CHALLENGES (3)

// 1) should add an expense
test('should add an expense',() => {
  const expense={
    id: 4,
    description: 'hello',
    note: '',
    amount: 77700,
    createdAt: moment(0).add(4,'days').valueOf()
  }

  const action={
    type: 'ADD_EXPENSE',
    expense
  };

  //console.log(action);
  const state=expensesReducer(expenses,action);
  //console.log('state: ', state);
  expect(state).toEqual([...expenses,expense]);
});

// 2) should edit an expense
// NOTE: the first test failed bc I didn't include
//  the updates object.  Instead I used the description
//  property directly.  WRONG!
//  It also failed bc I used expenses[0] instead of state[0]
//  for expect().
//  The correct version is shown below
//  Thanks, Andrew!
test('should edit an expense',() => {
  const description='edited description';
  const action={
    type: 'EDIT_EXPENSE',
    id: expenses[0].id,
    updates: { // don't forget the updates object!
      description
    }
  };
  const state=expensesReducer(expenses,action);

  // Grab the correct element from *state*, 
  //  NOT expenses!
  expect(state[0].description).toBe('edited description');
});

// 3) should not edit expense if id not found
// Woo-hoo! I passed this one on my own!
test('',() => {
  const description='edited description';
  const action={
    type: 'EDIT_EXPENSE',
    id: '-1',
    updates: { // don't forget the updates object!
      description
    }
  };
  const state=expensesReducer(expenses,action);

  expect(state).toEqual(expenses);
});