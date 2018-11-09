import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";

import {
  modificaEmail,
  modificaPassword,
  signin
} from "../../actions/UserAction";

import "./vendor/bootstrap/css/bootstrap.min.css";
import "./fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "./fonts/iconic/css/material-design-iconic-font.min.css";
import "./vendor/animate/animate.css";
import "./vendor/css-hamburgers/hamburgers.min.css";
import "./vendor/animsition/css/animsition.min.css";
import "./vendor/select2/select2.min.css";
import "./vendor/daterangepicker/daterangepicker.css";
import "./css/util.css";
import "./css/main.css";

class LoginForm extends Component {
  render() {
    return this.props.signin_complete ? (
      <Redirect to={{ pathname: "/Dashboard" }} />
    ) : (
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <div className="login100-form validate-form">
              <span
                style={{ color: "#f57315" }}
                className="login100-form-title p-b-26"
              >
                WebPeople
              </span>
              {/* <span className="login100-form-title p-b-48">
						<i className="zmdi zmdi-font"></i>
					</span> */}

              <div
                className="wrap-input100 validate-input"
                data-validate="Valid email is: a@b.c"
              >
                <input
                  className="input100"
                  type="text"
                  name="email"
                  onChange={texto =>
                    this.props.modificaEmail(texto.target.value)
                  }
                  value={this.props.email}
                />
                <span className="focus-input100" data-placeholder="Email" />
              </div>

              <div
                className="wrap-input100 validate-input"
                data-validate="Enter password"
              >
                <span className="btn-show-pass">
                  <i className="zmdi zmdi-eye" />
                </span>
                <input
                  className="input100"
                  type="password"
                  name="pass"
                  onChange={texto =>
                    this.props.modificaPassword(texto.target.value)
                  }
                  value={this.props.password}
                />
                <span className="focus-input100" data-placeholder="Password" />
              </div>

              <div className="container-login100-form-btn">
                <div className="wrap-login100-form-btn">
                  <div className="login100-form-bgbtn" />
                  <button
                    className="login100-form-btn"
                    onClick={() =>
                      this.props.signin(this.props.email, this.props.password)
                    }
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    email: state.UserReducer.email,
    password: state.UserReducer.password,
    signin_complete: state.UserReducer.signin_complete
  };
};

export default connect(
  mapStateToProps,
  { modificaEmail, modificaPassword, signin }
)(LoginForm);
