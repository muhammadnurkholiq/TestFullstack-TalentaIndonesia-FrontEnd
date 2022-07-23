// react
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import Swal from "sweetalert2";

// API
import { API } from "../config/API";

// css
import "../assets/css/pages/friends.css";

// components
import Navbar from "../components/navbar/Navigation";
import AddFriendModal from "../components/modal/AddFriendModal";

// images
import NotFound from "../assets/images/not found.png";

export default function Friends() {
  // useState
  const [data, setData] = useState([]);
  const [id, setId] = useState(null);

  // modal
  const [showAdd, setShowAdd] = useState(false);
  const handleClose = () => {
    setShowAdd(false);
    getData();
    setId(null);
  };
  const handleShowAdd = () => {
    setShowAdd(true);
  };

  // get data
  const getData = async () => {
    try {
      const response = await API.get("/friends");
      if (response.data.status === "Success") {
        setData(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handle delete
  const deleteFriend = async (id) => {
    try {
      // API delete
      const response = await API.delete("/friends/" + id);

      // response
      if (response.data.status === "Success") {
        Swal.fire(response.data.status, response.data.message, "success");
        getData();
        setId(null);
      } else {
        Swal.fire(response.data.status, response.data.message, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handleDelete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this data?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */

      if (result.isConfirmed) {
        deleteFriend(id);
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {/* navbar */}
      <Navbar />
      {/* content */}
      <Container className="friends">
        {/* header */}
        <Row className="header">
          <Col md={6} className="titleSide">
            <h1>Friends data</h1>
          </Col>
          <Col md={6} className="actionSide">
            <Button onClick={handleShowAdd}>Add Data</Button>
          </Col>
        </Row>
        {data?.length > 0 ? (
          <>
            {/* content */}
            <Row className="content">
              <Col md={12}>
                <Table bordered hover>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Name</th>
                      <th>Gender</th>
                      <th>Age</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.gender}</td>
                        <td>{item.age}</td>
                        <td>
                          <Button
                            onClick={() => {
                              setId(item.id);
                              handleShowAdd();
                            }}
                            className="btnEdit"
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => {
                              handleDelete(item.id);
                            }}
                            className="btnDelete"
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </>
        ) : (
          <div className="notFound">
            <img src={NotFound} alt="Data not found" />
            <h1>Data Not Found</h1>
          </div>
        )}
      </Container>
      {/* modal */}
      <AddFriendModal
        show={showAdd}
        handleClose={handleClose}
        data={data}
        getDatas={getData}
        id={id}
      />
    </>
  );
}
