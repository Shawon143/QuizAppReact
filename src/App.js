// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import QuizForm from "./components/QuizForm";
import QuizList from "./components/QuizList";
import UpdateQuiz from "./components/UpdateQuiz";
import DeleteQuiz from "./components/DeleteQuiz";
import Home from "./components/Home";
import Login from "./components/Login";
import { useAuth } from "./context/AuthContext";

function App() {
  const { isAdmin } = useAuth();

  return (
    <Router>
      <div>
        <Link to="/">
          <h1>Quiz App</h1>
        </Link>
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
      </div>
    </Router>
  );
}

export default App;
