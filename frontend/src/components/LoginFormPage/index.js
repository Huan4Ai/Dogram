import React, { useState } from "react";
import { useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';
import SignUpFormModal from "../SignupFormPage/index"
import phoneScreen from "./phoneScreen.png"
import customLogo from "./customLogo.jpg"


function LoginFormPage() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);


  const images = ["https://dogram.s3.us-east-2.amazonaws.com/dogImage1.jpg",
    // "https://dogram.s3.us-east-2.amazonaws.com/dogImage2.jpg",
    "https://dogram.s3.us-east-2.amazonaws.com/dogImage4.jpg",
    "https://dogram.s3.us-east-2.amazonaws.com/dogImage3.jpg"
  ]

  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const timeToChangeImage = setTimeout(() => {
      if (imageIndex === images.length - 1) {
        setImageIndex(0)
      } else {
        setImageIndex(imageIndex + 1)
      }
    }, 5000)

    return () => { clearTimeout(timeToChangeImage) }
  }, [imageIndex, images.length])


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  const demoButton = async () => {
    setCredential("DemoDoggy");
    setPassword("password");
    return dispatch(
      sessionActions.login({ credential: "DemoDoggy", password: "password" })
    );
  };

  return (
    <div className="loginPageContainer" style={{ backgroundImage: 'url(' + images[imageIndex] + ')' }}>
      {/* <div className="left-login">
        <img src={phoneScreen} alt="land page phone" />
      </div> */}
      {/* <div className="login-and-signup"> */}
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
            />
            <input
              type="password"
              className="passwordInput"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button type="submit" className="login_button">Login</button>
            <button onClick={demoButton} className="demo_user">Demo User</button>
          </form>
        <div className="signUpWrapper">
          <p>Don't have an account?</p>
          <SignUpFormModal />
          </div>
        <div className="footer">
          <a href="https://github.com/Huan4Ai/Dogram" id="githubIcon">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/huan-ai/">
            <i className="fab fa-linkedin" id="linkedinIcon"></i>
          </a>
        </div>
        </div>
        {/* <div className="signUpWrapper">
          <p>Don't have an account?</p>
          <SignUpFormModal />
        </div> */}
      {/* </div> */}
    </div>
  );
}

export default LoginFormPage;
