import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const VerifyLogin = () => {
  return (
    <>
      <Container>
        <h3>You are Verified</h3>
        <br />
        <h3>
          You can now
          <Link to="/login" style={{ textDecoration: "none" }}>
            login
          </Link>
        </h3>
      </Container>
    </>
  );
};

export default VerifyLogin;
