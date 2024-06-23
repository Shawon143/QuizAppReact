import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosConfig";
import { useParams, useNavigate } from "react-router-dom";

const UpdateQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axiosInstance.get(`/quizzes/${id}`);
        setQuiz(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching quiz:", error);
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  const handleInputChange = (e, questionIndex, optionIndex) => {
    const { name, value } = e.target;
    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      questions: prevQuiz.questions.map((q, idx) => {
        if (idx !== questionIndex) return q;
        if (name === "question") {
          return { ...q, question: value };
        } else if (name === "answer") {
          return { ...q, answer: value };
        } else if (name === "option") {
          const updatedOptions = [...q.options];
          updatedOptions[optionIndex] = value;
          return { ...q, options: updatedOptions };
        }
        return q;
      }),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put(`/quizzes/${id}`, quiz);
      console.log("Quiz updated:", response.data);
      alert("Quiz updated successfully!");
      navigate("/quizzes");
    } catch (error) {
      console.error("Error updating quiz:", error);
    }
  };

  const addQuestion = () => {
    const newQuestion = {
      question: "",
      options: ["", "", "", ""],
      answer: "",
    };
    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      questions: [...prevQuiz.questions, newQuestion],
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Update Quiz</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={quiz.title}
            onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            value={quiz.category}
            onChange={(e) => setQuiz({ ...quiz, category: e.target.value })}
            required
          />
        </div>
        {quiz.questions.map((q, questionIndex) => (
          <div key={questionIndex}>
            <label>Question {questionIndex + 1}:</label>
            <input
              type="text"
              name="question"
              value={q.question}
              onChange={(e) => handleInputChange(e, questionIndex)}
              required
            />
            {q.options.map((option, optionIndex) => (
              <div key={optionIndex}>
                <label>Option {optionIndex + 1}:</label>
                <input
                  type="text"
                  name="option"
                  value={option}
                  onChange={(e) =>
                    handleInputChange(e, questionIndex, optionIndex)
                  }
                  required
                />
              </div>
            ))}
            <div>
              <label>Answer:</label>
              <input
                type="text"
                name="answer"
                value={q.answer}
                onChange={(e) => handleInputChange(e, questionIndex)}
                required
              />
            </div>
          </div>
        ))}
        <button type="button" onClick={addQuestion}>
          Add Question
        </button>
        <button type="submit">Update Quiz</button>
      </form>
    </div>
  );
};

export default UpdateQuiz;
