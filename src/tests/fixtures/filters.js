import moment from 'moment';

// default filter values:
const filters = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
};

// filter values for testing:
const altFilters = {
  text: 'bills',
  sortBy: 'amount',
  startDate: moment(0),
  endDate: moment(0).add(3, 'days')
};

export { filters, altFilters };