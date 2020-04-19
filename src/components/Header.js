import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

// export this one for testing purposes:
// destructure ({ startLogout })
export const Header = ({ startLogout }) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title"to="/dashboard">
          <h1 >Expensify</h1>
        </Link>
        <button className="button button--link" onClick={startLogout}>Logout</button>
      </div>
    </div>
  </header>
);

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

// connected version of Header:
// mapStateToProps = undefined since we have no state to manipulate
export default connect(undefined, mapDispatchToProps)(Header);