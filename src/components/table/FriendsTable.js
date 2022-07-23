// react
import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";

// API
import { API } from "../../config/API";

// css
import "../../assets/css/components/table/index.css";

export default function FriendsTable() {
  // useState
  const [data, setData] = useState([]);

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

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="friendsTable">
      <h1>Data</h1>
      <Table bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.gender}</td>
              <td>{item.age}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
