import moment from 'moment';
import {
  setTextFilter,
  sortByAmount,
  sortByDate,
  setStartDate,
  setEndDate
} from '../../actions/filters';

// Andrew:
test('should generate set start date action object',() => {
  // Set a specific moment instance
  //  otherwise, moment() will be the time the ***test was run***
  const action=setStartDate(moment(0));
  expect(action).toEqual({
    type: 'SET_START_DATE',
    startDate: moment(0)
  });
});

test('should generate set end date action object',() => {
  const action=setEndDate(moment(0));
  expect(action).toEqual({
    type: 'SET_END_DATE',
    endDate: moment(0)
  });
});

test('should generate text filter action object with text value', () => {
  // it's a good idea to create a variable to prevent typos:
  const text = 'hello';
  const action = setTextFilter(text);
  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text
  });
});

test('should generate text filter action object with default (empty string)', () => {
  const action = setTextFilter();
  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text: ''
  });
});

test('should generate an action object to sort by date', () => {
  // const action = sortByDate();
  // expect(action).toEqual({
  //   type: 'SORT_BY_DATE'
  // });

  // Andrew, better:
  expect(sortByDate()).toEqual ({ type: 'SORT_BY_DATE' });
});

test('should generate an action object to sort by amount', () => {
  // const action = sortByAmount();
  // expect(action).toEqual({
  //   type: 'SORT_BY_AMOUNT'
  // });

  // Andrew, better:
  expect(sortByAmount()).toEqual({ type: 'SORT_BY_AMOUNT' });  
});