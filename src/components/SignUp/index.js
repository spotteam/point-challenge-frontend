import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Form, Button, Tabs, Tab } from 'react-bootstrap';

import { signUp, login } from '../../services/utils';

import './index.css';

function SignUp(props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const submitSignUp = (e) => {
    e.preventDefault()
    signUp(email, password, (jwt) => {
      window.localStorage.setItem('jwt', jwt);
      props.initialize(jwt);
    })
  }

  const submitLogin = (e) => {
    e.preventDefault()
    login(email, password, (jwt) => {
      window.localStorage.setItem('jwt', jwt);
      props.initialize(jwt);
    })
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
            <Button variant="primary" type="submit">
              Sign Up
            </Button>
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
            <Button variant="primary" type="submit">
              Log In
            </Button>
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