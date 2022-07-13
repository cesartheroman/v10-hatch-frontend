import {
  Alert,
  Box,
  Card,
  Heading,
  Paragraph,
  Separator,
  Stack,
  Tab,
  Text,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@twilio-paste/core";
import axios from "axios";
import { any } from "cypress/types/bluebird";
import { WarningIcon } from "@twilio-paste/icons/esm/WarningIcon";
import * as React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useUID } from "react-uid";
import { stringify } from "ts-jest";
import QAView from "./Components/QAView";
import params from "./App";

const EvaluationDetails = () => {
  const baseURL: string = "http://localhost:3000/evaluations/";

  /////////////////////////////
  // The below useState instances contain placeholder data. Ideally this would be switched out for some sort of Loading mechanic
  // at a later date.

  const [evaluation, setEvaluation] = useState({
    id: 69,
    title: "PLACEHOLDER TITLE",
    creation: "06/27/2022",
    finalized: "06/28/2022",
    is_completed: false,
    questions: [""],
    apprentice: { id: 4, name: "PLACEHOLDER APPRENTICE" },
    manager: { id: 2, name: "PLACEHOLDER MANAGER" },
    reviews: [
      {
        id: 1,
        status: "closed",
        reviewer: { id: 3, name: "PLACEHOLDER REVIEWER" },
        QA: [
          {
            question: {
              id: 555,
              text: "PLACEHOLDER QUESTION 1?",
            },
            answer: {
              id: 666,
              text: "PLACEHOLDER ANSWER 1",
            },
          },
        ],
      },
    ],
  });
  const [apprenticeReview, setApprenticeReview] = useState({
    id: 1,
    status: "closed",
    reviewer: { id: 3, name: "PLACEHOLDER REVIEWER" },
    QA: [
      {
        question: {
          id: 555,
          text: "PLACEHOLDER QUESTION 1?",
        },
        answer: {
          id: 666,
          text: "PLACEHOLDER ANSWER 1",
        },
      },
    ],
  });
  const [managerReview, setManagerReview] = useState({
    id: 1,
    status: "closed",
    reviewer: { id: 3, name: "PLACEHOLDER REVIEWER" },
    QA: [
      {
        question: {
          id: 555,
          text: "PLACEHOLDER QUESTION 1?",
        },
        answer: {
          id: 666,
          text: "PLACEHOLDER ANSWER 1",
        },
      },
    ],
  });
  const [reviewerReviews, setReviewerReviews] = useState([
    {
      id: 1,
      status: "closed",
      reviewer: { id: 3, name: "PLACEHOLDER REVIEWER" },
      QA: [
        {
          question: {
            id: 555,
            text: "PLACEHOLDER QUESTION 1?",
          },
          answer: {
            id: 666,
            text: "PLACEHOLDER ANSWER 1",
          },
        },
      ],
    },
  ]);

  //////////////////////
  //This is a mock user, this info will be available with the token of the logged in user.

  const user = {
    id: 2,
    name: "Ruthie Clark",
    roleID: 3,
    email: "ruthie@elias.com",
  };

  /////////////////
  // The below param variable gets the parameter for the axios call from the url, and then is used in the get from the /evaluations/:id
  // endpoint. It also filters and sets the reviews for the Apprentice, the Manager, and the remaining Reviewers at that time.

  let params = useParams();

  React.useEffect(() => {
    axios
      .get<any>(baseURL + params.id)
      .then((response) => {
        setEvaluation(response.data);
        setApprenticeReview(
          response.data.reviews.find(
            (review: any) => review.reviewer.id === response.data.apprentice.id
          )
        );
        setManagerReview(
          response.data.reviews.find(
            (review: any) => review.reviewer.id === response.data.manager.id
          )
        );
        setReviewerReviews(
          response.data.reviews.filter(
            (review: any) =>
              review.reviewer.id != response.data.manager.id &&
              review.reviewer.id != response.data.apprentice.id
          )
        );
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  }, []);

  //////////////////
  // The following two functions display if the review needs to be marked finalized by a manager .

  function ReviewFinalizeCheckTab(review: any) {
    if (review.status === "submitted" && user.roleID === 3) {
      return (
      
          <WarningIcon
            decorative={true}
            color="colorTextIconWarning"
            title="Finalization Needed"
            alt="Review Needs Manager Approval!"
            size="sizeIcon30"
          />
        
      );
    } else if (
      review.status === "in_progress" &&
      (user.id === review.reviewer.id || user.roleID === 3)
    ) {
      return (
      
          <WarningIcon
            decorative={true}
            color="colorTextNeutral"
            title="Finalization Needed"
            alt="Review Needs Manager Approval!"
            size="sizeIcon30"
          />
   
      );
    } else {
      return <></>;
    }
  }

  function ReviewFinalizeCheckHeader(status: string) {
    if (status === "submitted" && user.roleID === 3) {
      return (
        <div id="alert">
        <Alert variant="warning">
          <Text as="span">
           <strong>Review requires manager approval. </strong>
            Please approve the following review at your 
            earliest convenience. Thank you! <br /> 
            {/* TODO: link here to completing this evaluation !  */}
          </Text>
        </Alert>
        </div>
      );
    } else if (status === "in_progress") {
      return (
        <div id="alert">
        <Alert variant="neutral">
          <Text as="span">
           <strong>Review requires completion. </strong>
            Please complete the following review for {evaluation.apprentice.name} at your 
            earliest convenience. Thank you! <br /> 
            {/* TODO: link here to completing this evaluation !  */}
          </Text>
        </Alert>
        </div>
      );
      
      
      
      
    } else {
      return <></>;
    }
  }

  /////////////////////
  // The following three functions use if/else logic to display which version of the Tab appears for the Apprentice, the Manager,
  // and then any remaining Reviews after that. They also contain the ReviewFinalizedCheckTab function, and display the appropriate
  // message depending on the status of their particular review.

  function ApprenticeTab() {
    if (
      evaluation.apprentice.id === user.id ||
      user.roleID === 3 ||
      apprenticeReview.status === "finalized"
    ) {
      return (
        <Tab id={tabSelectedID}>
          {ReviewFinalizeCheckTab(apprenticeReview)} Apprentice: {evaluation.apprentice.name}{" "}
          
        </Tab>
      );
    } else {
      return (
        <Tab id={tabSelectedID} disabled>
          {ReviewFinalizeCheckTab(apprenticeReview)} Apprentice: {evaluation.apprentice.name}{" "}
          
        </Tab>
      );
    }
  }

  function ManagerTab() {
    if (
      evaluation.manager.id === user.id ||
      managerReview.status === "finalized"
    ) {
      return (
        <Tab>
          {ReviewFinalizeCheckTab(managerReview)} Manager: {evaluation.manager.name}{" "}
          {" "}
        </Tab>
      );
    } else {
      return (
        <Tab disabled>
          {ReviewFinalizeCheckTab(managerReview)} Manager: {evaluation.manager.name}{" "}
          
        </Tab>
      );
    }
  }

  function ReviewerTabs() {
    const tabs = reviewerReviews.map((review) => {
      if (
        review.reviewer.id === evaluation.apprentice.id ||
        review.reviewer.id === evaluation.manager.id
      ) {
        return <></>;
      } else if (
        review.status != "finalized" &&
        review.reviewer.id != user.id &&
        user.id != evaluation.manager.id
      ) {
        return (
          <Tab key={review.id} disabled>
            <span>{ReviewFinalizeCheckTab(review)} Reviewer: {review.reviewer.name}{" "}</span>
            
          </Tab>
        );
      } else {
        return (
          <Tab key={review.id}>
            <span> {ReviewFinalizeCheckTab(review)} Reviewer: {review.reviewer.name}{" "}</span>
           
          </Tab>
        );
      }
    });
    return tabs;
  }

  const tabSelectedID = useUID();

  // ====================================================================================================

  // ====================================================================================================
  //
  // ====================================================================================================

  return (
    <div id="evaluation">
      {/* 
HEADING FOR EVAL
 */}

      <div id="evaluationHeader">
        <Heading as="h2" variant="heading20">
          {evaluation.title}
        </Heading>
        <Heading as="h3" variant="heading50">
          Evaluation For {evaluation.apprentice.name} - Created{" "}
          {evaluation.creation}
        </Heading>
      </div>

      {/* 
TABS
 */}

      <Tabs
        orientation="vertical"
        selectedId={tabSelectedID}
        baseId="evaluation-reviews"
      >
        <TabList aria-label="review-tabs">
          {ApprenticeTab()}
          {ManagerTab()}
          {ReviewerTabs()}
        </TabList>

        {/* 
TAB PANELS 
 */}

        <TabPanels>
          <TabPanel>
          {ReviewFinalizeCheckHeader(apprenticeReview.status)} 
            <Heading as="h3" variant="heading30">
              Apprentice
              Review: {evaluation.apprentice.name}
            </Heading>
            <Stack orientation="vertical" spacing="space60">
              {apprenticeReview.QA.map((obj, index) => (
                <Card key={index} id="QAcard">
                  <Heading as="h4" variant="heading50">
                    <em>{obj.question.text}</em>
                  </Heading>
                  <Paragraph>{obj.answer.text}</Paragraph>
                </Card>
              ))}
            </Stack>
          </TabPanel>

          <TabPanel>
          {ReviewFinalizeCheckHeader(managerReview.status)} 
            <Heading as="h3" variant="heading30">
              Manager
              Reviewer: {evaluation.manager.name}
            </Heading>
            <Stack orientation="vertical" spacing="space60">
              {managerReview.QA.map((obj, index) => (
                <Card key={index} id="QAcard">
                  <Heading as="h4" variant="heading50">
                    <em>{obj.question.text}</em>
                  </Heading>
                  <Paragraph>{obj.answer.text}</Paragraph>
                </Card>
              ))}
            </Stack>
          </TabPanel>

          {reviewerReviews.map((review) => (
            <TabPanel key={review.id}>
              {ReviewFinalizeCheckHeader(review.status)}
              <Heading as="h3" variant="heading30">
                 Reviewer:{" "}
                {review.reviewer.name}
              </Heading>
              <Stack orientation="vertical" spacing="space60">
                {review.QA.map((obj, index) => (
                  <Card key={index} id="QAcard">
                    <Heading as="h4" variant="heading50">
                      <em>{obj.question.text}</em>
                    </Heading>
                    <Paragraph>{obj.answer.text}</Paragraph>
                  </Card>
                ))}
              </Stack>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default EvaluationDetails;
