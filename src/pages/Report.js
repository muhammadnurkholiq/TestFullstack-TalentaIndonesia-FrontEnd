// react
import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";

// API
import { API } from "../config/API";

// css
import "../assets/css/pages/report.css";

// components
import Navbar from "../components/navbar/Navigation";
import BarChart from "../components/chart/BarChart";
import FriendsTable from "../components/table/FriendsTable";

// images
import NotFound from "../assets/images/not found.png";

export default function Report() {
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

  // handle download
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {/* navbar */}
      <Navbar />
      {/* content */}
      <Container className="report">
        {data?.length > 0 ? (
          <>
            <div className="reportHeader">
              <button onClick={handlePrint} className="btnPrint">
                Print Report
              </button>
            </div>
            <div ref={componentRef} className="print">
              <Row>
                <Col md={12}>
                  <h1>Report</h1>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <>
                    <BarChart />
                    <FriendsTable />
                  </>
                </Col>
              </Row>
            </div>
          </>
        ) : (
          <>
            <div className="notFound">
              <img src={NotFound} alt="Data not found" />
              <h1>Data Not Found</h1>
            </div>
          </>
        )}
      </Container>
    </>
  );
}
