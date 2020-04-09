import React from 'react';
import { shallow, configure } from 'enzyme';
import expenses from '../fixtures/expenses';
// REMEMBER: check for named vs default exports:
// Can't always copy from other files directly (eg ExpenseList)!
import ExpenseListItem  from '../../components/ExpenseListItem';

// Challenge
// 1. Create this test file
// 2. Grab the imports
// 3. Render ExpenseListItem w/ fixtures (any ONE item)
// 4. Create a snapshot
// Note: this test will alert us if any changes are made to 
//   the component *display*
test('should render ExpenseListItem correctly', () => {
  const wrapper = shallow( <ExpenseListItem {...expenses[0]}/> );
  expect(wrapper).toMatchSnapshot();
});