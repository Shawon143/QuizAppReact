// src/components/Home.js
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f0f2f5;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 2.5em;
  color: #333;
  margin-bottom: 20px;
`;

const StyledLink = styled(Link)`
  color: #007bff;
  text-decoration: none;
  font-size: 1.2em;
  margin: 10px 0;

  &:hover {
    text-decoration: underline;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1em;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #0056b3;
  }
`;

const Home = () => {
  const { isAdmin, token, logout } = useAuth(); // Access isAdmin state from context

  return (
    <Container>
      <Title>Welcome to the Quiz App</Title>
      <StyledLink to="/quizzes">Get Quiz</StyledLink>
      {!token && <StyledLink to="/login">Login</StyledLink>}
      {token && (
        <>
          {isAdmin && <StyledLink to="/add-quiz">Add a new Quiz</StyledLink>}
          <Button onClick={logout}>Logout</Button>
        </>
      )}
    </Container>
  );
};

export default Home;
