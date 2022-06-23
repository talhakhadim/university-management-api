import React, { useState } from "react";
import { Form, Container, Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    age: "",
    phone: "",
    gender: "male",
  });
  const { email, name, password, age, phone, gender } = formData;
  const [register, setRegister] = useState(false);

  const onChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({
        email,
        name,
        password,
        age,
        gender,
        phone,
      });
      const res = await axios.post("/api/users", body, config);
      if (res.status === 200) {
        setRegister(true);
      }
      console.log(register);

      console.log(res.status);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {/* Register form */}
      <Container>
        <h1>Register</h1>
        {register && (
          <>
            <h1>Registration successfull</h1>
          </>
        )}

        <Form onSubmit={onSubmit}>
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Enter name"
            />
          </Form.Group>
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
          <Form.Group controlId="formBasicPhone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="number"
              name="phone"
              value={phone}
              onChange={onChange}
              placeholder="Enter Phone Number"
            />
          </Form.Group>
          <Form.Label>Gender</Form.Label>
          <Form.Select
            onChange={(e) =>
              setFormData({ ...formData, gender: e.target.value })
            }
            value={gender}>
            <option value="male" name="male">
              Male
            </option>
            <option value="female" name="female">
              Female
            </option>
          </Form.Select>

          <Form.Group controlId="formBasicAge">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              name="age"
              min="18"
              value={age}
              onChange={onChange}
              placeholder="Enter Age"
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
        <h5 style={{ marginTop: "10px" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ textDecoration: "none" }}>
            login here
          </Link>
        </h5>
      </Container>
    </>
  );
};

export default Register;
