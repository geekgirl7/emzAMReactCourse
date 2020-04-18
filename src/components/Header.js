import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

// export this one for testing purposes:
// destructure ({ startLogout })
export const Header = ({ startLogout }) => (
  <header>
    <div>
      <h1>Expensify</h1>
      <NavLink to="/dashboard" activeClassName="is-active">Dashboard</NavLink>
      <NavLink to="/create" activeClassName="is-active">Add Expense</NavLink>
      <button onClick={startLogout}>Logout</button>
    </div>
  </header>
);

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

// connected version of Header:
// mapStateToProps = undefined since we have no state to manipulate
export default connect(undefined, mapDispatchToProps)(Header);