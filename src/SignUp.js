import React, { useState } from "react";

import { signUp } from './services/utils'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function SignUp() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const submitSignUp = (e) => {
    e.preventDefault()
    signUp(email, password, (jwt) => window.localStorage.setItem('jwt', jwt))
  }

  return (
    <div>
      <form onSubmit={(e) => submitSignUp(e)}>
        <label>Email:</label>
        <input type="email" id="email" name="email" onChange={e => setEmail(e.target.value)}/>
        <label>Password:</label>
        <input type="password" id="password" name="password" onChange={e => setPassword(e.target.value)}/>
        <input type="submit" value="Sign Up"/>
      </form>
    </div>

  )
}

export default SignUp;