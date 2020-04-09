import moment from 'moment';

// Filters reducer
// const filtersReducerDefaultState={
//   text: "",
//   sortBy: 'date',
//   startDate: undefined,
//   endDate: undefined
// };

// Modifying filters reducer to work with DateRangePicker from react-dates
//   This is the only change needed for this file
const filtersReducerDefaultState={
  text: "",
  sortBy: 'date',
  startDate: moment().startOf('month'),
  endDate: moment().endOf('month')
};

// don't use a named export here bcz only exporting one thing.
// can also refactor the first line to simplify:
// *** const filtersReducer=(state=filtersReducerDefaultState,action) => { ***
// refactored:
export default (state=filtersReducerDefaultState,action) => {
  switch(action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      }
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount' // determines the sort METHOD: by amount
      }
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date'   // determines the sort METHOD: by date
      }
    case 'SET_START_DATE':
      //console.log('reducer: ', action.startDate);
      return {
        ...state,
        startDate: action.startDate
      }
    case 'SET_END_DATE':
      //console.log('reducer: ', action.endDate);
      return {
        ...state,
        endDate: action.endDate
      }
    default:
      return state;
  }
};
