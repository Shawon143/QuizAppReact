// src/components/QuizList.js (for example)
import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosConfig";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const { isAdmin } = useAuth(); // Access isAdmin state from context

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axiosInstance.get("/quizzes");
        setQuizzes(response.data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div>
      <h2>All Quizzes</h2>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz._id}>
            <strong>{quiz.title}</strong> - {quiz.category}
            {isAdmin && (
              <>
                <Link
                  to={`/quizzes/update/${quiz._id}`}
                  style={{ marginLeft: "10px" }}
                >
                  Update
                </Link>
                <Link
                  to={`/quizzes/delete/${quiz._id}`}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </Link>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizList;
