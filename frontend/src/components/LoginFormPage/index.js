import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';
import SignUpFormModal from "../SignupFormPage/index"
import phoneScreen from "./phoneScreen.png"
import logo2 from "./logo2.png"
import customLogo from "./customLogo.jpg"

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  const demoButton = async () => {
    setCredential("")
    setPassword("")
    return dispatch(
      sessionActions.login({ credential: "Demo-lition", password: "password" })
    );
  };

  return (
    <div className="loginPageContainer">
      <div className="left-login">
        <img src={phoneScreen} alt="land page phone" />
      </div>
      <div className="login-and-signup">
        <div className="right-login">
          <img src={customLogo} alt="dogram logo" id="dogramLogo" />
          {/* <h1>DOGRAM</h1> */}
          <form onSubmit={handleSubmit} className="login_form">
            <ul>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
            <input
              type="text"
              className="usernameInput"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              placeholder="Username or Email"
              required
            />
            <input
              type="password"
              className="passwordInput"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button type="submit" className="login_button">Login</button>
            <button onClick={demoButton} className="demo_user">Demo User</button>
          </form>
        </div>
        <div className="signUpWrapper">
          <p>Don't have an account?</p>
          <SignUpFormModal />
        </div>
        <div>
          <a href="https://github.com/Huan4Ai/Dogram" className="footer">About</a>
        </div>
      </div>
    </div>
  );
}

export default LoginFormPage;
