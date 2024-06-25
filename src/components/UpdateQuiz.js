// src/components/UpdateQuiz.js
import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosConfig";
import { useParams, useNavigate } from "react-router-dom";
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
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <Title>Update Quiz</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Title:</Label>
          <Input
            type="text"
            value={quiz.title}
            onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Category:</Label>
          <Input
            type="text"
            value={quiz.category}
            onChange={(e) => setQuiz({ ...quiz, category: e.target.value })}
            required
          />
        </FormGroup>
        {quiz.questions.map((q, questionIndex) => (
          <FormGroup key={questionIndex}>
            <Label>Question {questionIndex + 1}:</Label>
            <Input
              type="text"
              name="question"
              value={q.question}
              onChange={(e) => handleInputChange(e, questionIndex)}
              required
            />
            {q.options.map((option, optionIndex) => (
              <OptionGroup key={optionIndex}>
                <Label>Option {optionIndex + 1}:</Label>
                <Input
                  type="text"
                  name="option"
                  value={option}
                  onChange={(e) =>
                    handleInputChange(e, questionIndex, optionIndex)
                  }
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
                onChange={(e) => handleInputChange(e, questionIndex)}
                required
              />
            </FormGroup>
          </FormGroup>
        ))}
        <Button type="button" onClick={addQuestion}>
          Add Question
        </Button>
        <Button type="submit">Update Quiz</Button>
      </Form>
    </Container>
  );
};

export default UpdateQuiz;
