// src/components/Home.js
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { isAdmin, token, logout } = useAuth(); // Access isAdmin state from context

  return (
    <div>
      <h1>Welcome to the Quiz App</h1>
      <br />
      <Link to="/quizzes">Get Quiz</Link> <br />
      {!token && <Link to="/login">Login</Link>}
      {token && (
        <>
          {isAdmin && (
            <>
              <Link to="/add-quiz">Add a new Quiz</Link>
              <br />
            </>
          )}

          <br />
          <button onClick={logout}>Logout</button>
        </>
      )}
    </div>
  );
};

export default Home;
