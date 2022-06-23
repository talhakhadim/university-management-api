import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container } from "react-bootstrap";

const DashboardS = () => {
  const [user, setUser] = useState({});
  //get token from local storage

  const getUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get("/api/users/one", config);
      setUser(res.data.user);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Container>
        <h1 style={{ textAlign: "center" }}>Dashboard</h1>
        <h2>{`name: ${user.name}`}</h2>
        <h2>{`email: ${user.email}`}</h2>
        <Button variant="secondary">update</Button>
      </Container>
    </>
  );
};

export default DashboardS;
