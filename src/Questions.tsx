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

/**
 * Questions - A page for HM's to add questions that can be added to evaluations
 * toaster - Paste component for adding toast notifications
 * questions - array of current questions from the DB
 * currentUser - user data saved to local storage when user logs in being saved
 * token - auth token saved on login inside local storage
 * @returns
 */
const Questions = () => {
  const toaster = useToaster();
  const [questions, setQuestions] = useState([{ id: 1, question: "loading" }]);

  const [currentUser, setCurrentUser] = useState({
    id: 666,
    name: "Placeholder Placeholder",
    roleID: 4,
  });

  const [token, setToken] = useState("");

  /**
   * UseEffect - if id from userdata is = to place holder use effect fetches current credentials on page load
   * calls all questions on page load
   */
  useEffect(() => {
    if (currentUser.id === 666) {
      let storageuser: any = localStorage.getItem("user");
      let userinfo = JSON.parse(storageuser);
      let token: any = localStorage.getItem("token");

      setToken(token);
      setCurrentUser(userinfo);
    }
    getQuestions();
  }, [currentUser]);

  /**
   * handleEditQuestion = When a user clicks the "edit button", the input from user is used to update the current
   * question being modified, sending a PATCH to the BE DB
   * function gets passed to QuestionsDataGris.tsx then to QuestionsModal for each question
   * @param question
   * @param id
   */
  const handleEditQuestion = (question: any, id: number) => {
    var requestBody = { question };

    var config = {
      method: "PATCH",
      url: `http://localhost:9876/v1/api/questions/${id}`,
      headers: {
        Authorization: token,
      },
      data: requestBody,
    };

    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          toaster.push({
            message: "Question edit succesfull",
            variant: "success",
          });
        }
      })
      .catch(function (error) {
        toaster.push({
          message: "There was an error",
          variant: "error",
        });
        console.log(error);
      })
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
    var requestBody = { question };
    var config = {
      method: "POST",
      // TODO: will need to update with user token
      url: "http://localhost:9876/v1/api/questions",
      headers: {
        Authorization: token,
      },
      data: requestBody,
    };

    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          toaster.push({
            message: "Question created successfully",
            variant: "success",
          });
        }
      })
      .catch(function (error) {
        console.log(error.response.status);
        if (error.response.status >= 400 && error.response.status < 500) {
          toaster.push({
            message: "Error: Question input field empty",
            variant: "error",
          });
        } else {
          toaster.push({
            message: "Error",
            variant: "error",
          });
        }
      })
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
    var config = {
      method: "DELETE",
      url: `http://localhost:9876/v1/api/questions/${id}`,
      headers: {
        Authorization: token,
      },
    };

    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          toaster.push({
            message: "Question succesfully deleted",
            variant: "success",
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        getQuestions();
      });
  };

  /**
   * getQuestions = grabs all questions from questions endpoint
   */
  const getQuestions = () => {
    var config = {
      method: "GET",
      // TODO: will need to update
      url: "http://localhost:9876/v1/api/questions/",
      headers: {
        Authorization: token,
      },
    };

    axios(config)
      .then(function (response) {
        setQuestions(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Box>
      <Toaster {...toaster} />
      <Grid gutter="space30">
        <Column span={8} offset={2}>
          <Box marginTop="space100">
            <Card>
              <QuestionCreation handlePostQuestion={handlePostQuestion} />
            </Card>
          </Box>
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
