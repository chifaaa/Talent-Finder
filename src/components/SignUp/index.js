import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';

const SignUpPage = () => (
  <div>
    <SignUpForm />
  </div>
);
const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};
class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  onSubmit = event => {
    const { username, email, passwordOne } = this.state;
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase.user(authUser.user.uid).set
          (
            {
            username,
            email,
            },
            { 
            merge: true 
            },
          );
      })
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);

      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();

  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;


    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
<MDBContainer>
  <MDBRow>
    <MDBCol md="6">
      <form onSubmit={this.onSubmit}>
      <p className="h5 text-center mb-4">Sign Up</p>
        <div className="grey-text">
        <MDBInput
          name="username"
          value={username}
          onChange={this.onChange}
          group type="text"
          icon="user"
          label="Your name"
        />
        <MDBInput
          name="email"
          value={email}
          onChange={this.onChange}
          group type="email"
          icon="envelope"
          label="Your Email"
        />
        <MDBInput
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          group type="password"
          icon="lock"
          label="Your password"
        />
        <MDBInput
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          group type="password"
          icon="exclamation-triangle"
          label="Confirm your password"
        />
      </div>
      <div className="text-center">
        <MDBBtn color="primary" disabled={isInvalid} type="submit">Sign Up</MDBBtn>
        </div>
        {error && <p>{error.message}</p>}
      </form>
      </MDBCol>
  </MDBRow>
</MDBContainer>
    );
  }
}
const SignUpLink = () => (
  <p style={{textAlign:'center'}}>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);
const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);
export default SignUpPage;
export { SignUpForm, SignUpLink };


