import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import { NotificationManager } from "react-notifications";

// API
import { API } from "../../config/API";

// userContext
import { AuthContext } from "../../context/AuthContext";

// css
import "../../assets/css/components/auth/index.css";

export default function Login() {
  // usenavigate
  let navigate = useNavigate();
  // useContext
  const [state, dispatch] = useContext(AuthContext);
  // usestate
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
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

      // API login
      const response = await API.post("/login", body, config);

      // response
      if (response.data.status === "Success") {
        // Send data to useContext
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data,
        });

        navigate("/friend");

        NotificationManager.success(
          response.data.message,
          response.data.status,
          3000
        );
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
      <h1>Login</h1>

      {/* alert */}
      {message}

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
      <Button type="submit">login</Button>
    </Form>
  );
}
