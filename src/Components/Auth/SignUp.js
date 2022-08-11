import React from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const url = "http://localhost:5000/api/auth/user";
  const navigate = useNavigate();
  const userSignUp = async (user) => {
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
  const handleSignUp = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userObj = Object.fromEntries(formData);
    const response = await userSignUp(userObj);
    if (response.success) {
      localStorage.setItem("authToken", response.authToken);
      navigate("/");
    } else {
      alert("invalid");
    }
  };
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card>
        <Card.Body>
          <Form onSubmit={handleSignUp}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" type="text" placeholder="Enter Name" />
            </Form.Group>
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
                Sign Up
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SignUp;
