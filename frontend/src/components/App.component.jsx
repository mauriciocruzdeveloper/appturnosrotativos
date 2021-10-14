import React from "react";
import { Router } from "react-router-dom";
import history from "../history";
import { connect } from "react-redux";

import Routes from "../routes/Routes";

const App = ( { isLoggedIn, admin }) => {


  return (
    <div>
        <Router history = { history } >
          <Routes isLoggedIn = { isLoggedIn } admin = { admin }/>
        </Router>
    </div>
  );
};

const mapStateToProps = ( state ) => ({
  isLoggedIn: state.login.isLoggedIn,
  admin: state.login.usuario.admin
});

export default connect( mapStateToProps )( App );
