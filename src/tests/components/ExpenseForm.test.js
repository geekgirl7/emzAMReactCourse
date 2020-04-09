import React from 'react';
import { shallow }from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses.js';
import moment from 'moment';

// test the snapshot
test('should render ExpenseForm correctly', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

// should render ExpenseForm with expense data
//   check the snapshot to makes sure it looks "reasonable"
test('should render ExpenseForm with expense data', () => {
//  const expense = expenses[0];
//  console.log(expense);
// Anki question:  this will fail, why? What is the fix?
//  const wrapper = shallow( <ExpenseForm {expenses[0]}/> );
//  include the whole test file for the Question
//  Note: The reason is that ExpenseForm is called with 
//    ... expense={...} ...
//    Need to use *** expense={} *** syntax

  const wrapper = shallow( <ExpenseForm expense={expenses[0]}/> );
  expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot(); // initial snapshot
  // 1) find the <form> element
  // 2) simulate an event: 2nd arg = an obj NOT arrowFunc
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {} // create fake func: does nothing
  }); // .simulate(): from enzyme
  // We are expecting an error message, bc didnt send data
  expect(wrapper.state('error').length).toBeGreaterThan(0);
  // can run more than one assertion:
  expect(wrapper).toMatchSnapshot();
});

// Simulate a change event:
//   Test: When "description" changes, it actually does change the state
test('should set description on input change', () => {
  // can pass in data or not:
  const wrapper = shallow(<ExpenseForm />);  
  // 1) access the element (w/need to match 1st (description) input):
  //  w/use .at() to find the index for the correct input (1st = 0)
  //  See "Shallow Rendering" section in enzyme docs
  // 2) simulate the change (w/need to "provide" e.target.value)
  //   Note: the 2nd param = the e *object*. We will provide the *value*
  const value = 'New description';
  wrapper.find('input').at(0).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('description')).toBe(value);
});

// Challenge #1:
//  Do the "above" for onNoteChange()
//  w/need to search for "textarea", NOT "input"
//  Note: there is one ONE textarea, take out .at()!!!
//  Test: 'should set note on textarea change'
test('should set note on textarea change', () => {
  // can pass in data or not:
  const wrapper = shallow(<ExpenseForm />);  
  const value = 'New note';
  wrapper.find('textarea').simulate('change', {
    target: { value }
  });
  expect(wrapper.state('note')).toBe(value);
});

// Challenge #2, #3:
//  Test the "amount": valid and invalid
//  'should set amount if valid input': 23.50
//  'should not set the amount if invalid input' : 12.122
test('should not set the amount if invalid input', () => {
  const wrapper = shallow(<ExpenseForm />);  
  const value = '23.50';
  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  });

  expect(wrapper.state('amount')).toBe(value);
  console.log(wrapper.state);
});

test('should not set amount if valid input', () => {
  const wrapper = shallow(<ExpenseForm />);  
  const value = '12.122';
  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  });
  // an empty string is the default for invalid data
  expect(wrapper.state('amount')).toBe('');
});

// Example: How to create and use a test spy
// test('should call onSubmit prop for valid form submission', () => {
//   const onSubmitSpy = jest.fn();
//   // Test will fail w/out the following func call:
//   onSubmitSpy('Andrew');
//   expect(onSubmitSpy).toHaveBeenCalledWith('Andrew');
// });

test('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />);
  wrapper.find('form').simulate('submit', {
    preventDefault: () => { }
  });
  expect(wrapper.state('error')).toBe('');
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description: expenses[0].description,
    amount: expenses[0].amount,
    note: expenses[0].note,
    createdAt: expenses[0].createdAt
  });
});

test('should set new date on date change', () => {
  const now = moment();
  // render component, don't need to pass in data
  const wrapper = shallow(<ExpenseForm />);
  // need to trigger prop from child component (SingleDatePicker)
  // need *props([key]) for 1 prop or *props()* for more
  wrapper.find('SingleDatePicker').prop('onDateChange')(now); // functional programming
  // Check that the state was correctly set
  expect(wrapper.state('createdAt')).toEqual(now);
});

// Challenge:
// onFocusChange sets {calendarFocused: focused} (w/b true or false (default))
//   call w/true to make sure it's set correctly in state
test('should set calendar focus on change', () => {
  const focused = true;
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('SingleDatePicker').prop('onFocusChange')({focused}); // Need an OBJECT passed in! 
  expect(wrapper.state('calendarFocused')).toEqual(focused); 
});
