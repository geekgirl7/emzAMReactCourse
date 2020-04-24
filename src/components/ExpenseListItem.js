import React from 'react'; // don't forget this!!!
import {Link} from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

// Don't forget to remove these - they aren't necessary after Challenge #3
//import {connect} from 'react-redux';
//import {removeExpense} from '../actions/expenses';

/*
  Challenge 1:
  1) Export an SFC that renders description, amount and createdAt values
  2) Set it up with .map() (see previous code examples)
  3) 'Done' === included items showing up in the dashboard instead of
       the length.  Note: can edit the props/values or use the default values.
*/

// const ExpenseListItem = (props) => (
//   <div>
//     <p>{props.description}, {props.amount}, {props.createdAt}</p>
//   </div>
// );

// Better: Remember to use destructuring!
// REMEMBER: dispatch will be passed in with the other props now that
//  this component is connected to the redux store!!!
// NOTE: for Challenge 3, can remove dispatch since it's no longer needed
//   including commented out version for challenge 2, for reference only

// Challenge 2
// clicking on the description from dashboard will display the correct expense.
// To use an expense property as part of a dynamic link, 
//   interpolate the *to=* value: (example): to={`/edit/${id}`}

const ExpenseListItem=( {id,description,amount,createdAt} ) => (
  <Link className="list-item" to={`/edit/${id}`}>
  <div>
    <h3 className="list-item__title">{description}</h3>
    <span className="list-item__subtitle">{moment(createdAt).format('MMMM Do, YYYY')}</span>
  </div>
    <h3 className="list-item__data">{numeral(amount/100).format('$0,0.00')}</h3>
  </Link>
);


// export the connected version of this component instead
// of the "regular" component:
export default ExpenseListItem;



