// src/components/QuizList.js
import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosConfig";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state added
  const { isAdmin } = useAuth(); // Access isAdmin state from context

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true); // Set loading to true before API call
        const response = await axiosInstance.get("/quizzes");
        setQuizzes(response.data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchQuizzes();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display loading message while fetching data
  }

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
