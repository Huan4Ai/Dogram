import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css";
import SignUpFormModal from "../SignupFormPage/index";
import customLogo from "./customLogo.jpg";
import Form from "react-bootstrap/Form";

function LoginFormPage() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const images = [
    "https://dogram.s3.us-east-2.amazonaws.com/dogImage1.jpg",
    // "https://dogram.s3.us-east-2.amazonaws.com/dogImage2.jpg",
    "https://dogram.s3.us-east-2.amazonaws.com/dogImage4.jpg",
    "https://dogram.s3.us-east-2.amazonaws.com/dogImage3.jpg",
  ];


  // useEffect(() => {
  //   const timeToChangeImage = setTimeout(() => {
  //     if (imageIndex === images.length - 1) {
  //       setImageIndex(0);
  //     } else {
  //       setImageIndex(imageIndex + 1);
  //     }
  //   }, 5000);

  //   return () => {
  //     clearTimeout(timeToChangeImage);
  //   };
  // }, [imageIndex, images.length]);

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
    <div
      className="loginPageContainer"
      style={{ backgroundImage: "url(" + images[2] + ")" }}
    >
      <div className="right-login">
        <img src={customLogo} alt="dogram logo" id="dogramLogo" />
        {/* <h1>DOGRAM</h1> */}
        <Form onSubmit={handleSubmit} className="login_form">
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          {/* <input
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
          /> */}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="Username or Email"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <button type="submit" className="login_button">
            Login
          </button>
          <button onClick={demoButton} className="demo_user">
            Demo User
          </button>
        </Form>
        <div className="signUpWrapper">
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
