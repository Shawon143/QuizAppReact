// src/components/QuizForm.js
import React, { useState } from "react";
import axiosInstance from "../axiosConfig";

const QuizForm = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], answer: "" },
  ]);

  const handleInputChange = (e, index, optionIndex) => {
    const { name, value } = e.target;
    const updatedQuestions = [...questions];
    if (name === "question" || name === "answer") {
      updatedQuestions[index][name] = value;
    } else {
      updatedQuestions[index].options[optionIndex] = value;
    }
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], answer: "" },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const quizData = { title, category, questions };
      const response = await axiosInstance.post("/quizzes", quizData);
      console.log("Quiz created:", response.data);
      alert("Quiz created successfully!");
      // Clear the form fields
      setTitle("");
      setCategory("");
      setQuestions([{ question: "", options: ["", "", "", ""], answer: "" }]);
    } catch (error) {
      console.error("There was an error creating the quiz!", error);
    }
  };

  return (
    <div>
      <h2>Add a new Quiz</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        {questions.map((q, index) => (
          <div key={index}>
            <label>Question {index + 1}:</label>
            <input
              type="text"
              name="question"
              value={q.question}
              onChange={(e) => handleInputChange(e, index)}
              required
            />
            {q.options.map((option, optionIndex) => (
              <div key={optionIndex}>
                <label>Option {optionIndex + 1}:</label>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleInputChange(e, index, optionIndex)}
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
                onChange={(e) => handleInputChange(e, index)}
                required
              />
            </div>
          </div>
        ))}
        <button type="button" onClick={handleAddQuestion}>
          Add Question
        </button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default QuizForm;
