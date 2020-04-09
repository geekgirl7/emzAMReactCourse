import React from 'react'; // don't forget this!!!
import {connect} from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

// We will be exporting 2 components from this file:
// #1: unconnected version for *testing*
// #2: the connected version for the application

// export this as a named export (the unconnected version)
// Component #1
// #1a: Remove the <h1>Expense List</h1> as our first test
// #2a: Add conditional logic to handle and empty expense
// Original code:
// export const ExpenseList = (props) => (
//   <div>
//     <h1>Expense List</h1>
//     {props.expenses.map((expense) => {
//       return <ExpenseListItem key={expense.id} {...expense} />
//     })}
//   </div>
// );

// Modified code:
export const ExpenseList=(props) => (
  <div>
    {
      props.expenses.length===0 ? (
        <p>No expenses</p>
      ):(
        props.expenses.map((expense) => {
        return <ExpenseListItem key={expense.id} {...expense} />
        })
      )
    }
  </div>
);

const mapStateToProps=(state) => {
  return {
    expenses: selectExpenses(state.expenses,state.filters)
  };
};

// Component #2
export default connect(mapStateToProps)(ExpenseList);

// development only:
// const ExpenseList = (props) => (
//   <div>
//     <h1>Expense List</h1>
//     {
//       props.expenses.map((expense, index) => (
//         <ExpenseListItem
//           key={expense.id}
//           description={expense.description}
//           amount={expense.amount}
//           createdAt={expense.createdAt}
//         />
//       ))
//     }    
//   </div>
// );

//
// NOT a common pattern: ConnectedExpenseList
// const ConnectedExpenseList = connect((state) => {
//   return {
//     expenses: state.expenses
//   };
// })(ExpenseList);
// export default ConnectedExpenseList;

// IS a common pattern: (in general, 
//   not really for connect() - see below)
// export default connect((state) => {
//   return {
//     expenses: state.expenses
//   };
// })(ExpenseList);

// BEST pattern for connect():
//   create a variable: mapStateToProps
// const mapStateToProps = (state) => {
//   return {
//     expenses: state.expenses,
//     filters: state.filters
//   };
// };

// Better: instead of directly returning state to mapStateToProps,
//  pass in what you actually need, and pass the return value to mSTP
//  This will return the filtered data and pass that to mSTP
// const mapStateToProps=(state) => {
//   return {
//     expenses: selectExpenses(state.expenses,state.filters)
//   };
// };




// Pass mapStateToProps to connect():
// Note: connecting a component to the store = REACTIVE
//export default connect(mapStateToProps)(ExpenseList);
