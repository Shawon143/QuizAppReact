// src/components/QuizList.js
import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosConfig";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
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

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 100%;
  max-width: 600px;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  margin-bottom: 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const QuizInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const QuizTitle = styled.strong`
  font-size: 1.2em;
  color: #333;
`;

const QuizCategory = styled.span`
  font-size: 0.9em;
  color: #666;
`;

const ActionLink = styled(Link)`
  margin-left: 10px;
  font-size: 0.9em;
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Loading = styled.div`
  font-size: 1.5em;
  color: #333;
`;

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/quizzes");
        setQuizzes(response.data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  if (loading) {
    return <Loading>Loading...</Loading>;
  }

  return (
    <Container>
      <Title>All Quizzes</Title>
      <List>
        {quizzes.map((quiz) => (
          <ListItem key={quiz._id}>
            <QuizInfo>
              <QuizTitle>{quiz.title}</QuizTitle>
              <QuizCategory>{quiz.category}</QuizCategory>
            </QuizInfo>
            {isAdmin && (
              <>
                <ActionLink to={`/quizzes/update/${quiz._id}`}>
                  Update
                </ActionLink>
                <ActionLink to={`/quizzes/delete/${quiz._id}`}>
                  Delete
                </ActionLink>
              </>
            )}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default QuizList;
