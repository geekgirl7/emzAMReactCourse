// create a basic presentational component
import React from 'react';
import {connect} from 'react-redux';
import {DateRangePicker} from 'react-dates';
import {setTextFilter,sortByDate,sortByAmount,setStartDate,setEndDate} from '../actions/filters';

//==============================================================
// ExpenseListFilters modified to work with react-dates DateRangePicker
//   change component to a *class*

export class ExpenseListFilters extends React.Component {
  state={
    calendarFocused: null
  };
  // DON'T call dispatch() here!
  onDatesChange=({startDate,endDate}) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };
  // DON'T call dispatch() here!
  onFocusChange=(calendarFocused) => {
    this.setState(() => ({calendarFocused}));
  };

  // DON'T call dispatch() here!
  onTextChange=(e) => {
    this.props.setTextFilter(e.target.value);
  };

  onSortChange = (e) => {
    if(e.target.value==='date') {
       // DON'T call dispatch() here!
      this.props.sortByDate();
    } else if(e.target.value==='amount') {
       // DON'T call dispatch() here!
      this.props.sortByAmount();
    }
  }

  render() {
    return (
      <div className="content-container">
        <div className="input-group">
          <div className="input-group__item">
            <input
              type="text"
              value={this.props.filters.text}
              onChange={this.onTextChange}
            />
          </div>
          <div className="input-group__item">
            <select 
            value={this.props.filters.sortBy}
            onChange={this.onSortChange}>
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>        
          </div>
          <div className="input-group__item">
            <DateRangePicker
            startDate={this.props.filters.startDate}
            endDate={this.props.filters.endDate}
            onDatesChange={this.onDatesChange}
            focusedInput={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            showClearDates={true}
            isOutsideRange={() => false}
            />        
          </div>
        </div>
      </div>
    );
  }
};

//==============================================================
// Original component below - modified version is for 
//   react-dates DateRangePicker
// will have access to props.filters.text
// input doesn't auto change - c/set default value
//   but no updates/changes:
//   <input type="text" defaultValue={props.filters.text} />
//   c/still type in input, but we're out of sync
//   w/the redux store so no updates
// instead, need to use onChange={ () => {} }
//  w/change for every keystroke
//  w/have access to the event arg: e
//  need to change the redux store from func,
//  so need to dispatch an action for this.
//  DevTools: 
//    ...Router->Switch->ExpenseDashboardPage->ExpenseListFilters(NOT 'connect') -> {dispatch, filters}
//    Note: DevTools will show ExpenseListFilters twice: regular and connected versions
//      go with the regular version to see the props.  parent: connected version returned from func,
//      "regular": the component *we* created
//  Will need to import 'setTextFilters' from './actions/filters' 

// Challenge
// setup value and onChange for select
// (exactly the same as for input)
// need conditional logic for "date" and "amount"
// const ExpenseListFilters=(props) => (
//   <div>
//     <input
//       type="text"
//       value={props.filters.text}
//       onChange={(e) => {
//         props.dispatch(setTextFilter(e.target.value));
//       }}
//     />
//     <select onChange={(e) => {
//       if( e.target.value === 'date'){
//         props.dispatch(sortByDate());
//       } else if(e.target.value === 'amount') {
//         props.dispatch(sortByAmount());
//       }
//     }}>
//       <option value="date">Date</option>
//       <option value="amount">Amount</option>
//     </select>
//   </div>
// );


// // What do we want off of the store?
// // Here, just need the filters, not the expenses
// DON'T FORGET THE PARENS WHEN RETURNING AN OBJECT!!!
//  Otherwise the browser will generate an error:
//    "bundle.js this.props.filters is undefined", and
//    the site will NOT LOAD!
//  Note that the tests will ALL PASS without the parens!
//    Need to double-check EVERYTHING!
const mapStateToProps=(state) => ({
  filters: state.filters
 });

 const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (text) => dispatch(setTextFilter(text)),
  sortByDate: () => dispatch(sortByDate()),
  sortByAmount: () => dispatch(sortByAmount()),
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setStartDate(endDate))
});

// // export the connected version of this component instead
// // of the "regular" component:
export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);

// // Normally:
// // export default ExpenseListFilters;