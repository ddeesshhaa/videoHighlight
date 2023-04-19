import React from "react";
import Style from "./AuthStyle.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from '../../hooks/useAuthContext';

const Login = () => {

  const navigate = useNavigate();

  const { dispatch } = useAuthContext()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let res = await axios.post(
      "http://localhost:8080/login",
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const userData = await res.data;
    console.log(res);

    if (res.status === 200) {
      
      localStorage.setItem('vh_user', JSON.stringify(userData))

      dispatch({type: 'LOGIN', payload: userData});

      navigate("/");
    } else {
      console.log(res.status);
     
    }
  };

  return (
    <div className={Style.Auth_form_container}>
      <form className={Style.Auth_form} onSubmit={handleSubmit}>
        <div className={Style.Auth_form_content}>
          <h3 className={Style.Auth_form_title}>Sign In</h3>
          <div className="form-group mt-3">
            <label>Email </label>
            <input
              type="text"
              name="email"
              className="form-control mt-1"
              placeholder="Enter UserName"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p
            className="forgot-password text-center mt-2"
            style={{ paddingTop: "10px" }}
          >
            <b>
              <a href="/SignUp">register?</a>
            </b>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
