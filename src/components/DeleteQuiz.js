// src/components/DeleteQuiz.js
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosConfig";

const DeleteQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const deleteQuiz = async () => {
      if (window.confirm("Are you sure you want to delete this quiz?")) {
        try {
          await axiosInstance.delete(`/quizzes/${id}`);
          alert("Quiz deleted successfully!");
          navigate("/quizzes");
        } catch (error) {
          console.error("Error deleting quiz:", error);
        }
      } else {
        navigate("/quizzes");
      }
    };

    deleteQuiz();
  }, [id, navigate]);

  return <div>Deleting quiz...</div>;
};

export default DeleteQuiz;
