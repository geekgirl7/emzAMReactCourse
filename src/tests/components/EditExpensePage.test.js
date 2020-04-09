import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

//=======================================================
// Challenge from "Testing EditExpensePage" video:
//// Part 1:
////   Refactor EditExpensePage to be a class based component
////  Setup mapDispatchToProps: editExpense and removeExpense
////   Start app in development mode and make sure the component still works
// Part 2: Write the test cases
//   *should render EditExpensePage + snapshot
//   *should handle editExpense (use spies)
//   *should handle removeExpense (use spies)
//   *c/use beforeEach()
//=======================================================
// Each test will start with a 'clean' copy of the following:
let editExpense, removeExpense, history, wrapper;

beforeEach(() => {
  editExpense = jest.fn();
  removeExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
  <EditExpensePage 
    editExpense={editExpense}  
    removeExpense={removeExpense}
    history={history}
    expense={expenses[1]}  
  />);
});

// Remember to acually LOOK at the snapshot after the test!
test('should render EditExpensePage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

// Be careful with cut/paste!
// Make sure the test description + code matches what you're testing!
// for EACH TEST: ***LOOK*** at EditExpensePage to see what is being called 
//   (what is being ***passed into*** onSubmit()???)
test('should handle editExpense', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
  expect(history.push).toHaveBeenLastCalledWith('/');
  // in EditExpensePage, editExpense() is called like so:
  //   this.props.editExpense( this.props.expense.id,expense );
  expect(editExpense).toHaveBeenLastCalledWith(expenses[1].id, expenses[1]);
});

test('should handle removeExpense', () => {
  // Removing an expense does NOT involve ExpenseForm!
  // Be careful with cut/paste! To verify: LOOK at what you need!

  // 'button' is NOT part of ExpenseForm - need to find('button') here,
  //   and click it. LOOK first!
  // Note: no need to name an arg, it happens automatically
  wrapper.find('button').simulate('click');
  expect(history.push).toHaveBeenLastCalledWith('/');
  
  // The answer to the following is found in EditExpensePage: onRemove():
  //   this.props.removeExpense( ***{id: this.props.expense.id}*** );
  // LOOK first!
  // Don't forget that id:expenses[1].id is an OBJECT - needs curly braces
    expect(removeExpense).toHaveBeenLastCalledWith({id:expenses[1].id});
});