import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';
import SignUpFormModal from "../SignupFormPage/index"
import phoneScreen from "./phoneScreen.png"

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

  const demoButton = async (e) => {
    setCredential("Demo-lition");
    setPassword("password");
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
    <div className="loginPageContainer">
      <img src={phoneScreen} alt="land page phone"/>
      <form onSubmit={handleSubmit} className="login_form">
        <div className="login_errors">
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        </div>
        <div>
          <div>
            <label>
              Username or Email
            </label>
          </div>
          <div>
            <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              placeholder="Your username or email"
              required
            />
          </div>
        </div>
        <div>
          <div>
            <label>
              Password
            </label>
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              required
            />
          </div>
        </div>
        <div className="loginButtons">
          <SignUpFormModal />
          <button type="submit" className="login_button">Login</button>
          <button onClick={demoButton} className="demo_user">Demo User</button>
        </div>
        <div>
          <a href="https://github.com/Huan4Ai/Dogram" className="footer">About</a>
        </div>
      </form>
    </div>
  );
}

export default LoginFormPage;
