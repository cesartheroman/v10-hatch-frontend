import * as React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  Column,
  Grid,
  Card,
  useToaster,
  Toaster,
} from "@twilio-paste/core";
import axios from "axios";
import QuestionsDataGrid from "./QuestionsDataGrid";
import QuestionCreation from "./QuestionCreation";

const Questions = () => {
  const toaster = useToaster();
  const [questions, setQuestions] = useState([{ id: 1, question: "loading" }]);
  const baseURL: string = "http://localhost:3000/questions";

  useEffect(() => {
    getQuestions();
  }, []);

  const headers = {
    "Content-Type": "application/json",
  };

  /**
   * handleEditQuestion = When a user clicks the "edit button", the input from user is used to update the current
   * question being modified, sending a PATCH to the BE DB
   * function gets passed to QuestionsDataGris.tsx then to QuestionsModal for each question
   * @param question
   * @param id
   */
  const handleEditQuestion = (question: any, id: number) => {
    // TODO: connect to BE /api/v1/questions/:id
    axios
      .patch(
        baseURL + `/${id}`,
        { id: id, question: question },
        { headers: headers }
      )
      .then((res) => {
        if (res.status === 200) {
          toaster.push({
            message: "Question edit succesfull",
            variant: "success",
          });
        }
      })

      .catch((err) => console.log(err))
      .finally(() => {
        getQuestions();
      });
  };

  /**
   * handlePostQuestion = Handler function for submiting new question created by user
   * posting to database
   * function gets passed to QuestionCreation.tsx
   * @param question : users input from QuestionCreation component
   */
  const handlePostQuestion = (question: any) => {
    // TODO: connect to backend /api/v1/questions
    // TODO: edit data object to comply with BE schema
    axios
      .post(
        baseURL,
        { id: questions.length + 1, question: question },
        { headers: headers }
      )
      .then((res) => {
        if (res.status === 201) {
          toaster.push({
            message: "Question created successfully",
            variant: "success",
          });
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        getQuestions();
      });
  };

  /**
   * handleDeleteQuestion = Handler function for deleting individual questions via delete link. Makes a call
   * to api with id as a param for finding question
   * function gets passed to QuestionsDataGrid.tsx
   * @param id
   */
  // TODO: DELETE Function
  const handleDeleteQuestion = (id: number) => {
    // TODO: Connect to backend /api/v1/questions/:id
    axios
      .delete(baseURL + `/${id}`)
      .then((res) => {
        if (res.status === 200) {
          toaster.push({
            message: "Question succesfully deleted",
            variant: "success",
          });
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        getQuestions();
      });
  };

  /**
   * getQuestions = grabs all questions from questions endpoint
   */
  const getQuestions = () => {
    // TODO: Connect to backend /api/v1/questions
    axios
      .get(baseURL)
      .then((res) => {
        setQuestions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box>
      <Toaster {...toaster} />
      <Grid gutter="space30">
        <Column span={8} offset={2}>
          <Card>
            <QuestionCreation handlePostQuestion={handlePostQuestion} />
          </Card>
          <br />
          <QuestionsDataGrid
            handleEditQuestion={handleEditQuestion}
            questions={questions}
            handleDeleteQuestion={handleDeleteQuestion}
          />
        </Column>
      </Grid>
    </Box>
  );
};

export default Questions;
