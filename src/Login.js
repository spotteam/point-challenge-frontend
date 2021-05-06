import React, { useState } from "react";

import { login } from './services/utils'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const submitLogin = (e) => {
    e.preventDefault()
    login(email, password, (jwt) => window.localStorage.setItem('jwt', jwt))
  }

  return (
    <div>
      <form onSubmit={(e) => submitLogin(e)}>
        <label>Email:</label>
        <input type="email" id="email" name="email" onChange={e => setEmail(e.target.value)}/>
        <label>Password:</label>
        <input type="password" id="password" name="password" onChange={e => setPassword(e.target.value)}/>
        <input type="submit" value="Login"/>
      </form>
    </div>

  )
}

export default Login;