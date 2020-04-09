import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import {ExpenseListFilters} from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixtures/filters';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

// Note: 5 Challenges listed below

// Tests failed because of the following line:
// *beforeEach((params) => {*
// Don't forget to check the defaults when using extensions (anfn)!
// Here is the correct line:
beforeEach(() => { // delete the default 'params'!
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  wrapper = shallow(
    <ExpenseListFilters
    // send in the needed props defined above in beforeEach():
      filters={filters}
      setTextFilter={setTextFilter}
      sortByDate={sortByDate}
      sortByAmount={sortByAmount}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />  
  );
});

// This one will test the default values
test('should render ExpenseListFilters correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters with alt data correctly', () => {
  // read more in enzyme docs: .setProps(props)
  // example: wrapper.setProps({name: 'bar'}); // pass in an object
  wrapper.setProps({
    filters: altFilters
  });
  expect(wrapper).toMatchSnapshot();
});

//==============================================================
// Challenges - 5 tests 
// Will assert something about the spies, making sure the correct props were called:
// 1) should handle text change
// Simulate a change event:
//   Test: When "description" changes, it actually does change the state
//     need to provide something for e.target.value
test('should handle text change', () => {
  const value = 'hello';
  wrapper.find('input').simulate('change', {
    target:{ value }
  });
  expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

// 2) should sort by date (use .simulate() + the change-event: 
//      need to provide something for e.target.value
test('should sort by date', () => {
  // set to props to 'amount' (using altFilters) to verify it gets changed to 'date'
  // Remember: 'date' is the default, so need to verify it *changes*
  wrapper.setProps({
    filters: altFilters 
  });
  const value = 'date';
  wrapper.find('select').simulate('change',{
    target:{ value }
  });
  expect(sortByDate).toHaveBeenCalled();
});

// 3) should sort by amount (use .simulate() + the change-event)
//      need to provide something for e.target.value

test('should sort by amount', () => {
// DON'T use altFilters here.  
// Since the default is 'date', the test will verify the change to 'amount'
//  without altFilters
  const value = 'amount';
  wrapper.find('select').simulate('change',{
    target:{ value }
  });
  expect(sortByAmount).toHaveBeenCalled();
});

// 4) should handle date changes
test('should handle date changes', () => {
  wrapper.setProps({
    filters: altFilters
  });
  // Need to create the dates, but DON'T use the ones from altFilters!
  // Need to make them up to verify that they change
  const startDate = moment(0).add(4, 'years');
  const endDate = moment(0).add(8, 'years');
  // Remember that we're testing a RANGE.  
  // Don't use 'SingleDatePicker' here
  wrapper.find('DateRangePicker').prop('onDatesChange')({startDate, endDate}); 
  expect(setStartDate).toHaveBeenLastCalledWith(startDate);
  expect(setEndDate).toHaveBeenLastCalledWith(endDate);
 
});

// Will assert something about the state.
// 5) should handle date focus changes
test('should handle date focus changes', () => {
 // Remember that we're testing a RANGE.  
  // Don't use 'focused' prop here
  const calendarFocused = 'endDate';
  wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused); 
  expect(wrapper.state('calendarFocused')).toBe(calendarFocused); 
});