// react
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import Swal from "sweetalert2";

// userContext
import { AuthContext } from "../../context/AuthContext";

// css
import "../../assets/css/components/navbar/index.css";

export default function Navigation() {
  // context
  const [state, dispatch] = useContext(AuthContext);

  // handle logout
  const handleLogout = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch({ type: "LOGOUT" });
      }
    });
  };

  return (
    <>
      {/* navbar */}
      <Navbar expand="lg">
        <Container>
          <NavLink to="/friend" className="navbar-brand">
            Friendship
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <NavLink to="/friend" className="nav-link">
                Friends
              </NavLink>
              <NavLink to="/report" className="nav-link">
                Report
              </NavLink>
              <Button onClick={handleLogout} className="nav-link nav-logout">
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
