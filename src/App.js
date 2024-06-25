// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import styled from "styled-components";
import QuizForm from "./components/QuizForm";
import QuizList from "./components/QuizList";
import UpdateQuiz from "./components/UpdateQuiz";
import DeleteQuiz from "./components/DeleteQuiz";
import Home from "./components/Home";
import Login from "./components/Login";
import { useAuth } from "./context/AuthContext";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f0f2f5;
  min-height: 100vh;
`;

const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #007bff;
  padding: 20px;
`;

const TitleLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 2em;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

function App() {
  const { isAdmin } = useAuth();

  return (
    <Router>
      <Container>
        <Header>
          <TitleLink to="/">Quiz App</TitleLink>
        </Header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          {isAdmin && (
            <>
              <Route path="/add-quiz" element={<QuizForm />} />
              <Route path="/quizzes/update/:id" element={<UpdateQuiz />} />
              <Route path="/quizzes/delete/:id" element={<DeleteQuiz />} />
            </>
          )}
          <Route path="/quizzes" element={<QuizList />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
