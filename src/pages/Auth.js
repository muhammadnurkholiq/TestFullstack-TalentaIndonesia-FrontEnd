// react
import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

// css
import "../assets/css/pages/auth.css";

// components
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";

// image
import FriendsImage from "../assets/images/friends.png";

export default function Auth() {
  const [login, setLogin] = useState(true);

  const handleLogin = () => {
    setLogin(true);
  };

  const handleRegister = () => {
    setLogin(false);
  };

  return (
    <div className="auth">
      <Container>
        <Row>
          <Col md={6} className="imageSide">
            <img src={FriendsImage} alt="Friends" />
            <h1>Friendship</h1>
          </Col>
          <Col md={6} className="inputSide">
            {login ? (
              <>
                <Login />
                <p className="inputOption">
                  don't have an account?
                  <span onClick={handleRegister}> Register here</span>
                </p>
              </>
            ) : (
              <>
                <Register />
                <p className="inputOption">
                  Already have an account?
                  <span onClick={handleLogin}> Login here</span>
                </p>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
