import React from 'react';
import moment from 'moment';
import {SingleDatePicker} from 'react-dates';
//import 'react-dates/lib/css/_datepicker.css'; // move out of this file -> app.js

// Remember to use the "addExpense" option on 
//   the menu!!!!! it defaults to "Home"!!!
// const date = new Date();
//const now=moment();
//console.log(now.format('MMM Do, YYYY'));

// Modify state using conditional logic
//  AddExpensePage is OK with '' for default
//  EditExpensePage requires the *current* values
// For state values for *editing* an expense, need current values
//  OR acceptable defaults.
//  To do this, need to define state in the *constructor function*
//  (just move the whole thing into the constructor func WITH props,
//  ***remembering to call*** super(props))
//  Note: this step is just refactoring!
// Use conditional logic to determine the correct values for
//   add/edit expense - they're NOT always the same!
//     amount: calc in pennies, but need to display a string with decimals
//     createAt: need to pass the ***timeStamp*** to moment() ***from props***
export default class ExpenseForm extends React.Component {
  constructor(props){
    super(props);
    this.state={
      description: props.expense ? props.expense.description : '',
      note: props.expense ? props.expense.note: '',
      amount: props.expense ? (props.expense.amount / 100).toString(): '',
      createdAt: props.expense ? moment(props.expense.createdAt): moment(),
      calendarFocused: false,
      error: ''
    };
  }
  onDescriptionChange=(e) => {
    const description=e.target.value;
    this.setState(() => ({description}));
  };
  onNoteChange=(e) => {
    const note=e.target.value;
    this.setState(() => ({note}));
  };
  onAmountChange=(e) => {
    const amount=e.target.value;
    // if there's not an amount, or amount matches...
    // matches = empty string or at least 1 num, 
    //  followed by up to 2 decimals
    // This will allow the user to clear the field if needed
    if(!amount||amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({amount}));
    }
  };
  onDateChange=(createdAt) => {
    // prevent user from clearing date value
    //  (don't want empty date)
    if(createdAt) {
      this.setState(() => ({createdAt}));
    }// else do nothing
  };
  onFocusChange=({focused}) => {
    this.setState(() => ({calendarFocused: focused}));
  };
  onSubmit = (e) => {
    // prevent full page refresh
    e.preventDefault();
    if(!this.state.description || !this.state.amount){
      // error state='Please provide description & amount'
      this.setState(() => ({error: 'Please provide description & amount'}));
    } else {
      // Clear the error
      //console.log('submitted');
      this.setState(() => ({error: ''}));
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10) *100,
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note
      });
    }
  };

  // Challenge: wire up error: set and clear
  // Conditionally render the error string
  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.onSubmit}>
          <input
            className="text-input"
            type="text"
            placeholder="Description"
            autoFocus
            value={this.state.description}
            onChange={this.onDescriptionChange}
          />
          <input
            className="text-input"
            type="text"
            placeholder="Amount"
            value={this.state.amount}
            onChange={this.onAmountChange}
          />
          <SingleDatePicker
            date={this.state.createdAt}
            onDateChange={this.onDateChange}
            focused={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            isOutsideRange={() => false}
          />
          <textarea
            className="textarea"
            placeholder="Add a note for your expense (optional)"
            value={this.state.note}
            onChange={this.onNoteChange}
          >
          </textarea>
          <button>Add Expense</button>
        </form>
      </div>
    )
  }
}

