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
import * as React from "react";
import { useParams } from "react-router-dom";
import { useUID } from "react-uid";
import { stringify } from "ts-jest";
import QAView from "./Components/QAView";

/**
 * Component that returns an evaluation's reviews.
 * Display conditionally set by role
 *
 * @component
 * @typedef UpdateReviewAnswer
 * @typedef EvaluationSchema
 *
 */

type UpdateReviewAnswer = {
  id: number;
  status: string;
  reviewer: { id: number; name: string };
  QA: {
    QAID: number,
    question: {
      id: number;
      text: string;
    };
    answer: {
      id: number;
      text: string;
    };
  }[];
};
type EvaluationSchema = {
  id: number;
  title: string;
  creation: string;
  finalized: string;
  is_completed: boolean;
  questions: string[];
  apprentice: { id: number; name: string };
  manager: { id: number; name: string };
  reviews: UpdateReviewAnswer[];
};

const EvaluationDetails = () => {
  const baseURL: string = "http://localhost:3000/evaluations/";
  const [evaluation, setEvaluation] = React.useState<EvaluationSchema>({
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
          { QAID: 42069,
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

  //////////////////////
  //This is a mock user, this info will be available with the token of the logged in user
  const user = {
    id: 2,
    name: "Jiminy Cricket",
    roleID: 3,
    email: "ruthie@elias.com",
  };

  let params = useParams();
  let evaluationID = params.id;

  React.useEffect(() => {
    axios.get<EvaluationSchema>(baseURL + evaluationID).then((response) => {
      setEvaluation(response.data);
    });
  }, []);

  const tabSelectedID = useUID();

  function ReviewerTabs(): any {
    const reviewerReviews = evaluation.reviews.filter((review) => {
      review.reviewer.id != evaluation.manager.id ||
        review.reviewer.id != evaluation.apprentice.id;
    });
    const tabArray = reviewerReviews.map((review) => {
      return <Tab>Reviewer: {review.reviewer.name}</Tab>;
    });
    return tabArray;
  }

  function DisplayReviews(review: any, id: number) {
    if (review.reviewer.id === id) {
      return (review.QA.map((obj: any) => {
        <Box key={obj.QAID}>
          <Heading as="h4" variant="heading60">
            {obj.question.text}
          </Heading>
          <Paragraph>{obj.answer.text}</Paragraph>
          {obj.answer.text}
        </Box>
      }))
    } else {
      return <></>;
    }
  }

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
          {/* TODO: logic for disabling tabs according to user's role */}
          <Tab id={tabSelectedID}>
            Apprentice: {evaluation.apprentice.name}{" "}
          </Tab>
          <Tab>Manager: {evaluation.manager.name} </Tab>
          {evaluation.reviews.map((review) => {
            if (
              review.reviewer.id === evaluation.apprentice.id ||
              review.reviewer.id === evaluation.manager.id
            ) {
              return <></>;
            } else {
              return (
                <Tab key={review.reviewer.id}>
                  Reviewer: {review.reviewer.name}
                </Tab>
              );
            }
          })}
        </TabList>

        <TabPanels>
          <TabPanel>
            <Heading as="h3" variant="heading30">
              Review: {evaluation.apprentice.name} Self-Evaluation
            </Heading>
            <Stack orientation="vertical" spacing="space60">
              {evaluation.reviews.map((review) => {
                <div key={review.id}>
                 {DisplayReviews(review, evaluation.apprentice.id)}
                </div>
              })}
            </Stack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default EvaluationDetails;
