import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Container, Table, Spinner } from "react-bootstrap";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // getUsers();
  const getUsers = async () => {
    try {
      const response = await axios.get("/api/users");

      setUsers(response.data.users);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log()
  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`/api/users/${id}`);
      console.log(response);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <>
      <h3
        style={{
          marginBottom: "20px",
          marginTop: "10px",
          textAlign: "center",
        }}>
        Users
      </h3>
      <Container>
        {loading && <Spinner animation="grow" size="lg" />}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Index</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index = 0) => {
              return (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.gender}</td>
                  <td>{user.age}</td>

                  <td>
                    <Button
                      type="button"
                      variant="danger"
                      size="sm"
                      onClick={(e) => {
                        deleteUser(user._id);
                      }}>
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default Home;
