import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Form, Button, Tabs, Tab } from 'react-bootstrap';

import { signUp, login } from '../../services/utils';

import './index.css';

function SignUp(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authFail, setAuthFail] = useState(false);

  const authCallback = (success, jwt=null) => {
    if (success === true && jwt !== null) {
      window.localStorage.setItem('jwt', jwt);
      props.initialize(jwt);
    } else {
      setAuthFail(true);
    }
  }

  const submitSignUp = (e) => {
    e.preventDefault()
    signUp(email, password, authCallback)
  }

  const submitLogin = (e) => {
    e.preventDefault()
    login(email, password, authCallback)
  }

  return (
    <div className="signup-card">
      <Tabs defaultActiveKey="signup" transition={false}>
        <Tab eventKey="signup" title="Sign Up">
          <Form onSubmit={(e) => submitSignUp(e)}>
            <Form.Group controlId="signupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={e => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="signupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
              />
            </Form.Group>
            <div className="button-row">
              <Button variant="primary" type="submit">
                Sign Up
              </Button>
              {authFail &&
                <div className="auth-fail-text">
                  Authentication failed
                </div>
              }
            </div>
          </Form>
        </Tab>
        <Tab eventKey="login" title="Log In">
          <Form onSubmit={(e) => submitLogin(e)}>
            <Form.Group controlId="loginEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={e => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="loginPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
              />
            </Form.Group>
            <div className="button-row">
              <Button variant="primary" type="submit">
                Log In
              </Button>
              {authFail &&
                <div className="auth-fail-text">
                  Authentication failed
                </div>
              }
            </div>
          </Form>
        </Tab>
      </Tabs>
    </div>
  )
}

SignUp.propTypes = {
  initialize: PropTypes.func.isRequired,
}

export default SignUp;