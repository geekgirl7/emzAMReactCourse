// Action Generators
// export all as named exports

// SET_TEXT_FILTER
export const setTextFilter=(text='') => ({
  type: 'SET_TEXT_FILTER',
  text
});

// SORT_BY_AMOUNT
// don't set the sortBy string to 'amount' here!
// since it will never change, set it in the reducer
export const sortByAmount=() => ({
  type: 'SORT_BY_AMOUNT'
});

// don't set the sortBy string to 'date' here!
// since it will never change, set it in the reducer
// SORT_BY_DATE
export const sortByDate=() => ({
  type: 'SORT_BY_DATE'
});

// SET_START_DATE
// don't need to set undefined since it's already in filtersReducerDefaultState
// const setStartDate=(startDate=undefined) => ({
export const setStartDate=(startDate) => ({
  type: 'SET_START_DATE',
  startDate
});

// SET_END_DATE
// don't need to set undefined since it's already in filtersReducerDefaultState
//const setEndDate=(endDate=undefined) => ({
export const setEndDate=(endDate) => ({
  type: 'SET_END_DATE',
  endDate
});