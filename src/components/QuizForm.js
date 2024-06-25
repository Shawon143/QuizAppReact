// src/components/QuizForm.js
import React, { useState } from "react";
import axiosInstance from "../axiosConfig";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f0f2f5;
  min-height: 100vh;
`;

const Title = styled.h2`
  font-size: 2em;
  color: #333;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 1em;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const OptionGroup = styled.div`
  margin-bottom: 10px;
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

  &:not(:last-child) {
    margin-right: 10px;
  }
`;

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
    <Container>
      <Title>Add a new Quiz</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Title:</Label>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Category:</Label>
          <Input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </FormGroup>
        {questions.map((q, index) => (
          <FormGroup key={index}>
            <Label>Question {index + 1}:</Label>
            <Input
              type="text"
              name="question"
              value={q.question}
              onChange={(e) => handleInputChange(e, index)}
              required
            />
            {q.options.map((option, optionIndex) => (
              <OptionGroup key={optionIndex}>
                <Label>Option {optionIndex + 1}:</Label>
                <Input
                  type="text"
                  value={option}
                  onChange={(e) => handleInputChange(e, index, optionIndex)}
                  required
                />
              </OptionGroup>
            ))}
            <FormGroup>
              <Label>Answer:</Label>
              <Input
                type="text"
                name="answer"
                value={q.answer}
                onChange={(e) => handleInputChange(e, index)}
                required
              />
            </FormGroup>
          </FormGroup>
        ))}
        <Button type="button" onClick={handleAddQuestion}>
          Add Question
        </Button>
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
};

export default QuizForm;
