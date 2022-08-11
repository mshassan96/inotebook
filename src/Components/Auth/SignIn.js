import React from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SignIn = ({ showAlert }) => {
  const url = "http://localhost:5000/api/auth/login";
  const navigate = useNavigate();
  const userSignIn = async (user) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const jsonResponse = await response.json();

    return jsonResponse;
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userObject = Object.fromEntries(formData);
    const res = await userSignIn(userObject);
    if (res.success) {
      localStorage.setItem("authToken", res.authToken);
      navigate("/");
      showAlert("Logged In Successfully.");
    } else {
      showAlert("Error: Invalid Request.", "danger");
    }
  };
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card>
        <Card.Body>
          <Form onSubmit={submitForm}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <div className="w100 text-center">
              <Button variant="primary" type="submit">
                Sign In
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SignIn;
