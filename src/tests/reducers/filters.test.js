import moment from 'moment';
import filtersReducer from '../../reducers/filters'

test('should setup default filter values',() => {
  const state=filtersReducer(undefined,{type: '@@INIT'});
  expect(state).toEqual({
    text: '',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month'),
    sortBy: 'date'
  });
});

test('should set sortBy to amount', () => {
  const state = filtersReducer(undefined, {type: 'SORT_BY_AMOUNT'});
  expect(state).toEqual({
    text: '',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month'),
    sortBy: 'amount'
  });
});

// sortBy : 'date' is the default!
// set sortBy to amount so that we can see it CHANGE.
test('should set sortBy to date',() => {
  const currentState = {
    text: '',
    startDate: undefined,
    endDate: undefined,
    sortBy: 'amount'
  };
  const action = {type: 'SORT_BY_DATE'};
  const state = filtersReducer(currentState, action);
  // We can use .toBe() because we're checking a VALUE, not an object
  expect(state.sortBy).toBe('date');
});

// CHALLENGES
// should set  text filter
// Emmie
// test('should set text filter', () => {
//   const currentState = {
//     text: '',
//     startDate: undefined,
//     endDate: undefined,
//     sortBy: 'amount'
//   };
//   const action = { 
//     type: 'SET_TEXT_FILTER',
//     text: 'hello'
//   }
//   const state = filtersReducer(currentState, action);
//   expect(state.text).toBe('hello');
// });
// BETTER - Andrew:
test('should set text filter', () => {
  const text = 'hello';
  const action = { 
    type: 'SET_TEXT_FILTER',
    text
  }
  // don't need "currentState" var - just send in undefined for state
  const state = filtersReducer(undefined, action);
  expect(state.text).toBe(text);
});

// should set startDate filter
// all following tests similar to Emmie's above - changed to Andrew's below
// Note: Andrew just used moment(), but I added on to practice moment API
test('should set startDate filter', () => {
  const startDate = moment().subtract(2, 'days');
  const action = {
    type: 'SET_START_DATE',
    startDate
  }
  const state = filtersReducer(undefined, action);
  expect(state.startDate).toBe(startDate);
});

// should set endDate filter
test('should set endDate filter', () => {
  const endDate = moment().add(2, 'days');
  const action = {
    type: 'SET_END_DATE',
    endDate
  }
  const state = filtersReducer(undefined, action);
  expect(state.endDate).toBe(endDate);
});