import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

// API
import { API } from "../../config/API";

// css
import "../../assets/css/components/auth/index.css";

export default function Register() {
  // usestate
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // change value state form
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // handle submit
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // config
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      // data
      const body = JSON.stringify(form);

      // API register
      const response = await API.post("/register", body, config);

      // response
      if (response.data.status === "Success") {
        const alert = <Alert variant="success">{response.data.message}</Alert>;
        setMessage(alert);
      } else {
        const alert = <Alert variant="danger">{response.data.message}</Alert>;
        setMessage(alert);
      }
    } catch (error) {
      const alert = <Alert variant="danger">Server error</Alert>;
      setMessage(alert);
      console.log(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* title */}
      <h1>Register</h1>

      {/* alert */}
      {message}

      {/* fullname */}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Fullname</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={form.name}
          placeholder="Enter fullname"
          onChange={handleChange}
        />
      </Form.Group>

      {/* email */}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={form.email}
          placeholder="Enter email"
          onChange={handleChange}
        />
      </Form.Group>

      {/* password */}
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={form.password}
          placeholder="Password"
          onChange={handleChange}
        />
      </Form.Group>

      {/* button */}
      <Button type="submit">Register</Button>
    </Form>
  );
}
