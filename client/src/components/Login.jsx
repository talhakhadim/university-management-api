import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Navigate } from "react-router-dom";

import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [login, setLogin] = useState(false);

  const { email, password } = formData;
  const onChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    //send the data to the server
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({ email, password });
      const res = await axios.post("/api/users/login", body, config);
      if (res.data.success) {
        setLogin(true);
        console.log(res.data);
        localStorage.setItem("token", res.data.jwtToken);
      }
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {/* login form */}
      <Container>
        <h1>Login</h1>
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              onChange={onChange}
              value={password}
              placeholder="Password"
            />
          </Form.Group>

          <Button className="mt-4" variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        {login && (
          <>
            <Navigate to="/" replace={true} />
          </>
        )}
      </Container>
    </>
  );
};

export default Login;
