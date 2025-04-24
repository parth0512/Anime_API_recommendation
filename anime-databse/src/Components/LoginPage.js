import React, { useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../context/global";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const { login } = useGlobalContext();
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAuth = (e) => {
    e.preventDefault();
    if (form.email && form.password && (isSignup ? form.name : true)) {
      login({
        name: form.name,
        email: form.email,
      });
      navigate("/");
    } else {
      alert("Please fill all fields!");
    }
  };

  return (
    <LoginStyle>
      <div className="form-container">
        <h1>{isSignup ? "Sign Up" : "Login"}</h1>
        <form onSubmit={handleAuth}>
          {isSignup && (
            <input
              type="text"
              name="name"
              placeholder="Username"
              value={form.name}
              onChange={handleChange}
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>
        </form>
        <p>
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <span onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    </LoginStyle>
  );
}

const LoginStyle = styled.div`
  height: 100vh;
  background: black;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;

  .form-container {
    background: #1f1f1f;
    padding: 3rem;
    border-radius: 20px;
    box-shadow: 0 0 15px #5151e5;
    width: 400px;
    text-align: center;

    h1 {
      margin-bottom: 2rem;
      background: linear-gradient(to right, #72edf2, #5151e5);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      input {
        padding: 0.7rem;
        border-radius: 10px;
        border: none;
        font-size: 1rem;
        background-color: #333;
        color: white;
        outline: none;
      }

      button {
        padding: 0.7rem;
        border-radius: 10px;
        background: linear-gradient(to right, #72edf2, #5151e5);
        color: white;
        border: none;
        font-size: 1.1rem;
        cursor: pointer;
        transition: 0.3s;
        font-weight: bold;

        &:hover {
          opacity: 0.9;
        }
      }
    }

    p {
      margin-top: 1rem;
      span {
        color: #72edf2;
        cursor: pointer;
        font-weight: bold;
      }
    }
  }
`;

export default LoginPage;
