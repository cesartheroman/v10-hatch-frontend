import {
  Box,
  Card,
  Heading,
  Paragraph,
  Separator,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@twilio-paste/core";
import axios from "axios";
import { any } from "cypress/types/bluebird";
import * as React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useUID } from "react-uid";
import { stringify } from "ts-jest";
import QAView from "./Components/QAView";
import params from "./App";

/**
 * Component that returns an evaluation's reviews.
 * Display conditionally set by role
 *
 * @component
 * @typedef UpdateReviewAnswer
 * @typedef EvaluationSchema
 *
 */

// type ReviewSchema = {
//   id: number;
//   status: string;
//   reviewer: { id: number; name: string };
//   QA: {
//     question: {
//       id: number;
//       text: string;
//     };
//     answer: {
//       id: number;
//       text: string;
//     };
//   }[];
// };
// type EvaluationSchema = {
//   id: number;
//   title: string;
//   creation: string;
//   finalized: string;
//   is_completed: boolean;
//   questions: string[];
//   apprentice: { id: number; name: string };
//   manager: { id: number; name: string };
//   reviews: ReviewSchema[];
// };

const EvaluationDetails = () => {
  const baseURL: string = "http://localhost:3000/evaluations/";
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
  //This is a mock user, this info will be available with the token of the logged in user
  const user = {
    id: 2,
    name: "Jiminy Cricket",
    roleID: 3,
    email: "ruthie@elias.com",
  };

  let params = useParams();

  React.useEffect(() => {
    axios
      .get<any>(baseURL + params.id)
      .then((response) => {
        console.log(response.data);
        console.log(params.id);
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

  const [ApprenticeTabIsVisible, setApprenticeTabIsVisible] = useState(true);
  const [ManagerTabIsVisible, setManagerTabIsVisible] = useState(true);

  function ApprenticeTab() {
    if (
      evaluation.apprentice.id === user.id ||
      apprenticeReview.status === "finalized"
    ) {
      setApprenticeTabIsVisible(true);
      return (
        <Tab id={tabSelectedID}>Apprentice: {evaluation.apprentice.name} </Tab>
      );
    } else {
      setApprenticeTabIsVisible(false);
      return <Tab disabled>Apprentice: {evaluation.apprentice.name}</Tab>;
    }
  }

  function ManagerTab() {
    if (
      (evaluation.manager.id === user.id ||
        managerReview.status === "finalized") &&
      !ApprenticeTabIsVisible
    ) {
      return <Tab id={tabSelectedID}>Manager: {evaluation.manager.name} </Tab>;
    } else if (
      evaluation.manager.id === user.id ||
      managerReview.status === "finalized"
    ) {
      return <Tab>Manager: {evaluation.manager.name} </Tab>;
    } else {
      return <Tab disabled>Manager: {evaluation.manager.name} </Tab>;
    }
  }

  function ReviewerTabs() {
    evaluation.reviews.map((review) => {
      if (
        review.reviewer.id === evaluation.apprentice.id ||
        review.reviewer.id === evaluation.manager.id
      ) {
        return <></>;
      } else if (
        review.status !== "finalized" &&
        review.reviewer.id !== user.id
      ) {
        return (
          <Tab key={review.id} disabled>
            Reviewer: {review.reviewer.name}
          </Tab>
        );
      } else if (!ApprenticeTabIsVisible && !ManagerTabIsVisible) {
       return( <Tab id={tabSelectedID} key={review.id}>
          Reviewer: {review.reviewer.name}
        </Tab>)
      } else {
        return <Tab key={review.id}>Reviewer: {review.reviewer.name}</Tab>;
      }
    });
  }

  const tabSelectedID = useUID();

  return (
    <div id="evaluation">
      <div id="evaluationHeader">
        <Heading as="h2" variant="heading20">
          {evaluation.title}
        </Heading>
        <Heading as="h3" variant="heading50">
          Evaluation For {evaluation.apprentice.name} - Created{" "}
          {evaluation.creation}
        </Heading>
      </div>
      <Tabs
        orientation="vertical"
        selectedId={tabSelectedID}
        baseId="evaluation-reviews"
      >
        <TabList aria-label="review-tabs">
          <ApprenticeTab />
          <ManagerTab />
          {/* <ReviewerTabs /> */}
        </TabList>

        <TabPanels>
          <TabPanel>
            <Heading as="h3" variant="heading30">
              Apprentice Review: {evaluation.apprentice.name}
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
            <Heading as="h3" variant="heading30">
              Manager Reviewer: {evaluation.manager.name}
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
              <Heading as="h3" variant="heading30">
                Reviewer: {review.reviewer.name}
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
