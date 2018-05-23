import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import '../../../public/signin.scss';
import isAdmin from '../../../helpers/isAdmin';
import { userSignup, clearError } from '../../../actions/userActions';
import isValidDetails from '../../../validations/signup.validate';
import { LoadingIcon, } from '../../utils/LoaderComponents';
import { actionRejectedPrompter } from '../../../utils/alerts.sweetalert';
import isAuthenticated from '../../../helpers/isAuthenticated';
/**
 *
 *
 * @class SignupBody
 * @extends {Component}
 */
class SignupBody extends Component {
/**
 * Creates an instance of SignupBody.
 * @param {any} props
 * @memberof SignupBody
 */
  constructor(props) {
    super(props);
    this.state = {
      email: undefined,
      firstname: undefined,
      lastname: undefined,
      password: undefined,
      confirmpassword: undefined,
    };
    this.getSignUpDetails = this.getSignUpDetails.bind(this);
    this.signup = this.signup.bind(this);
  }

  /**
 *
 *
 * @memberof SigninBody
 * @returns {html} dom object model
 */
  componentWillMount() {
    if (isAuthenticated()) {
      browserHistory.push('/events');
    }
  }

  /**
 *
 *
 * @param {any} nextProps
 * @returns {function} browserhistory function that redirects to another component
 * @memberof SignupBody
 */
  componentWillReceiveProps(nextProps) {
    if (isAdmin() && nextProps.user.status.authenticated) {
      return browserHistory.push('/centers');
    }
    if (!isAdmin() && nextProps.user.status.authenticated) {
      return browserHistory.push('/');
    }
  }
  /**
  *
  *
  * @memberof SignupBody
  * @returns {object} state after action dispatched
  */
  componentWillUnmount() {
    if (this.props.user.status.error) {
      this.props.dispatch(clearError());
    }
  }
  /**
 *
 *
 * @param {any} event
 * @memberof SignupBody
 * @returns {string} data from input dom element
 */
  getSignUpDetails(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
 *
 *
 * @param {any} event
 * @memberof SignupBody
 * @returns {object} state after action dispatched
 */
  signup(event) {
    event.preventDefault();
    const validationErrors = isValidDetails(this.state);
    if (!isValidDetails(Array.isArray(validationErrors))) {
      return actionRejectedPrompter(validationErrors);
    }
    this.props.dispatch(userSignup({
      ...this.state,
    }));
  }
  /**
 *
 *
 * @returns { object } html dom object
 * @memberof SignupBody
 */
  render() {
    return (
      <div>
        <div className="signup-page">
          <div className="form-section container">
            <form className="form form-group form-container sign-in-container container">
              <div className="form-header" style={{ paddingBottom: `${10}px` }}>
                <p
                  className="text-center header-form"
                  style={{
                    marginTop: `${10}%`, paddingTop: `${20}px`
                  }}
                >
                  SIGN UP
                </p>
              </div>
              <div>
                <label htmlFor="firstname">firstname</label>
                <input onChange={this.getSignUpDetails} type="text" name="firstname" className="form-control first-name" />
                <label htmlFor="lastname">lastname</label>
                <input onChange={this.getSignUpDetails} type="text" name="lastname" className="form-control" />
                <label htmlFor="email">email</label>
                <input onChange={this.getSignUpDetails} type="text" name="email" placeholder="example@gmail.com" className="form-control" />
                <label htmlFor="password">password</label>
                <input onChange={this.getSignUpDetails} type="password" name="password" className="form-control" />
                <label htmlFor="confirmpassword">retype password</label>
                <input onChange={this.getSignUpDetails} type="password" name="confirmpassword" placeholder="retype password" className="form-control" />
                <div className="text-center btn-padder">
                  <button className="btn btn-submit btn-outline" type="submit" onClick={this.signup}><span className="text-center">Sign Up</span></button>
                </div>
                { (this.props.user.status.fetching) &&
                <LoadingIcon />
                }
                <br />
                <div>
                  <p className="text-center">Already have an account? sign in<span className="switchform" style={{ color: 'skyblue', fontSize: '0.8em', marginTop: '10px', marginBottom: '10px' }}><Link to="/signin"> here</Link></span></p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch =>
  ({
    dispatch: (actionObject => dispatch(actionObject))
  })
);

const mapStateToProps = (state =>
  ({
    user: state.userReducer
  })
);

export default connect(mapStateToProps, mapDispatchToProps)(SignupBody);

const propTypes = {
  user: PropTypes.shape({
    status: PropTypes.objectOf(PropTypes.bool),
    unauthenticatedErrorMessage: PropTypes.string,
    errorMessage: PropTypes.string,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

SignupBody.propTypes = propTypes;
