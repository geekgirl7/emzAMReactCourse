// Expenses reducer
// state default for expenses: [] (no default expense)
// state default for filters: text, sortBy, start/endDate
// c/create a variable for state default to make more readable:
const expensesReducerDefaultState=[];

// don't use a named export here bcz only exporting one thing.
// can also refactor the first line to simplify:
// *** const expensesReducer=(state=expensesReducerDefaultState,action) => { ***
// refactored:
export default (state=expensesReducerDefaultState,action) => {
  switch(action.type) {
    case 'ADD_EXPENSE':
      return [...state,action.expense];
    case 'REMOVE_EXPENSE':
      return state.filter(({id}) => id!==action.id);
    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if(expense.id===action.id) {
          return {
            ...expense,
            ...action.updates
          }
        } else {
          return expense;
        }
      });
    case 'SET_EXPENSES':
      // don't care about the state since we'll override it
      console.log('action.expenses: ', action.expenses);
      return action.expenses; 
    default:
      return state;
  }
};
