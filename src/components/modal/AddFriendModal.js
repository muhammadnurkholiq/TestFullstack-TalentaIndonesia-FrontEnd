// react
import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";

// API
import { API } from "../../config/API";

// css
import "../../assets/css/components/modal/addFriendModal.css";

export default function AddFriendModal({ show, handleClose, id, getDatas }) {
  // usestate
  const [form, setForm] = useState({
    name: "",
    gender: "",
    age: "",
  });
  const [formEdit, setFormEdit] = useState({
    name: "",
    gender: "",
    age: "",
  });

  // change value state form
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeEdit = (e) => {
    setFormEdit({
      ...formEdit,
      [e.target.name]: e.target.value,
    });
  };

  // get data
  const getData = async () => {
    try {
      const response = await API.get("/friends/" + id);
      if (response.data.status === "Success") {
        setFormEdit({
          name: response.data.data.name,
          gender: response.data.data.gender,
          age: response.data.data.age,
        });
      }
    } catch (error) {
      console.log(error);
    }
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
      const response = await API.post("/friends", body, config);

      // response
      if (response.data.status === "Success") {
        Swal.fire(response.data.status, response.data.message, "success");
      } else {
        Swal.fire(response.data.status, response.data.message, "error");
      }
      handleClose();
      getDatas();
    } catch (error) {
      console.log(error);
      handleClose();
      getData();
    }
  };

  // handle edit
  const handleEdit = async (e) => {
    try {
      e.preventDefault();

      // config
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      // data
      const body = JSON.stringify(formEdit);

      // API register
      const response = await API.put("/friends/" + id, body, config);

      // response
      if (response.data.status === "Success") {
        Swal.fire(response.data.status, response.data.message, "success");
      } else {
        Swal.fire(response.data.status, response.data.message, "error");
      }
      handleClose();
      getDatas();
    } catch (error) {
      console.log(error);
      handleClose();
    }
  };

  useEffect(() => {
    getData();
    setForm({
      name: "",
      gender: "",
      age: "",
    });
  }, [show]);

  return (
    <Modal show={show} onHide={handleClose} className="modalAddFriend">
      {id === null ? (
        <>
          <Modal.Header>
            <Modal.Title>Add Friend Data</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>Fullname</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={form.name}
                  placeholder="Enter name (min 4 length)"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                >
                  <option value="" hidden selected>
                    Select gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  name="age"
                  value={form.age}
                  placeholder="Enter age"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={handleClose} className="btnCancel">
                Close
              </Button>
              <Button type="submit" className="btnSubmit">
                Submit
              </Button>
            </Modal.Footer>
          </Form>
        </>
      ) : (
        <>
          <Modal.Header>
            <Modal.Title>Edit Friend Data</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleEdit}>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>Fullname</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formEdit.name}
                  onChange={handleChangeEdit}
                  placeholder="Enter name (min 4 length)"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  name="gender"
                  value={formEdit.gender}
                  onChange={handleChangeEdit}
                >
                  <option value="" hidden selected>
                    Select gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  name="age"
                  value={formEdit.age}
                  onChange={handleChangeEdit}
                  placeholder="Enter age"
                  required
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={handleClose} className="btnCancel">
                Close
              </Button>
              <Button type="submit" className="btnSubmit">
                Submit
              </Button>
            </Modal.Footer>
          </Form>
        </>
      )}
    </Modal>
  );
}
