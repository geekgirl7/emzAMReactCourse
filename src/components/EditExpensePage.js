import React from 'react';
import {connect} from 'react-redux';
import ExpenseForm from './ExpenseForm';
import {editExpense,removeExpense} from '../actions/expenses';
// don't need to import these separately!!!
//import {removeExpense} from '../actions/expenses';


//=======================================================
// Challenge from "Testing EditExpensePage" video:
// Part 1:
//   Refactor EditExpensePage to be a class based component
//   Setup mapDispatchToProps: editExpense and removeExpense
//   Start app in development mode and make sure the component still works
//// Part 2: Write the test cases
////   *should render EditExpensePage + snapshot
////   *should handle editExpense (use spies)
////   *should handle removeExpense (use spies)
////   *c/use beforeEach()
//=======================================================
export class EditExpensePage extends React.Component {
  onSubmit=( expense ) => {
    // don't forget *this.* inside a ***class***
    this.props.editExpense( this.props.expense.id,expense );
    this.props.history.push( '/' );
  }
  onRemove = () => {
    this.props.removeExpense({id: this.props.expense.id});
    this.props.history.push( '/' );
  };
  render () {
    return (
      <div>
        <ExpenseForm
          expense={this.props.expense}
          onSubmit={this.onSubmit}
        />
        <button onClick={this.onRemove}>Remove</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  // Look at what is being passed into the func ABOVE
  editExpense: (id, expense) => dispatch(editExpense(id, expense)),
  // Note: needed to look at react-redux docs for mapDispatchToProps
  //   (I looked at Andrew's code to try and figure it out)
  // Note: *data* is just the arg name and it gets passed through as-is
  //   to removeExpense(data)
  removeExpense: (data) => dispatch(removeExpense(data))
});
//=======================================================

// The HOC will pass in the props and we can add new props as well
// can pass in BOTH state and props to mSTP()
// can add on new props to be returned from mSTP
// This func will add one new prop: expense
//  and we are going to be using the current props to search 
//  the expenses array to find the correct expense-by-id
//  We will use find() for the one which returns true from the *callback*
const mapStateToProps=( state,props ) => ({
    expense: state.expenses.find( ( expense ) => expense.id===props.match.params.id )
});
export default connect( mapStateToProps, mapDispatchToProps )( EditExpensePage );
//=======================================================

// Original, returning the correct expense
// const EditExpensePage = (props) => {
//   console.log(props);
//   return (
//     <div>Editing the expense with id of {props.match.params.id}</div>
//   );
// };

// Modified #1, returning correct values in the ExpenseForm component
// Challenge (3rd for the video):
// Move the Remove button from the dashboard page and include it in EditExpensePage
//   Delete connect() from ExpenseListItem.js, not needed any more
//   Remove expense via dispatch and then redirect to the dashboard page
//   Don't forget to check the required param for removeExpense! 
//     it requires an OBJECT, not just props.expense.id
// const EditExpensePage = (props) => {
//   console.log(props);
//   return (
//     <div>
//       <ExpenseForm
//       expense={props.expense}
//         onSubmit={(expense) => {
//           // Challenge:
//           // dispatch the action to edit the expense
//           // redirect to the dashboard page
//           console.log('updated: ', expense);
//           props.dispatch(editExpense(props.expense.id, expense));
//           props.history.push('/');
//         }}
//       />
//       <button onClick={(e) => {
//         console.log("props.expense.id: ", props.expense.id);
//         props.dispatch(removeExpense({id: props.expense.id}));
//         props.history.push('/');
//       }}>Remove</button>

//     </div>
//   );
// };

