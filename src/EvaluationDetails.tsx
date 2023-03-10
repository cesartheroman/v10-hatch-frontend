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
import { Link, useParams } from "react-router-dom";
import { useUID } from "react-uid";
import { stringify } from "ts-jest";
import QAView from "./Components/QAView";
import params from "./App";
import image from "./news.png";
import { ProcessInProgressIcon } from "@twilio-paste/icons/esm/ProcessInProgressIcon";
import moment from "moment";

const EvaluationDetails = () => {
  const baseURL: string = "http://localhost:9876/v1/api/evaluations/";

  /////////////////////////////
  // The below useState instances contain placeholder data. Ideally this would be switched out for some sort of Loading mechanic
  // at a later date.

  const [evaluation, setEvaluation] = useState({
    id: 69,
    title: " ",
    creation: " ",
    finalized: " ",
    is_completed: false,
    questions: [""],
    apprentice: { id: 99999, name: " " },
    manager: { id: 99999, name: " " },
    reviews: [
      {
        id: 99999,
        status: " ",
        reviewer: { id: 99999, name: " " },
        QAs: [
          {
            question: {
              id: 555,
              text: " ",
            },
            answer: {
              id: 666,
              text: " ",
            },
          },
        ],
      },
    ],
  });
  const [apprenticeReview, setApprenticeReview] = useState({
    id: 99999,
    status: "closed",
    reviewer: { id: 999, name: " " },
    QAs: [
      {
        question: {
          id: 555,
          question: " ",
        },
        answer: {
          id: 666,
          answer: " ",
        },
      },
    ],
  });
  const [managerReview, setManagerReview] = useState({
    id: 99999,
    status: "closed",
    reviewer: { id: 999, name: "PLACEHOLDER REVIEWER" },
    QAs: [
      {
        question: {
          id: 555,
          question: "PLACEHOLDER QUESTION 1?",
        },
        answer: {
          id: 666,
          answer: "PLACEHOLDER ANSWER 1",
        },
      },
    ],
  });
  const [reviewerReviews, setReviewerReviews] = useState([
    {
      id: 99999,
      status: "closed",
      reviewer: { id: 999, name: "PLACEHOLDER REVIEWER" },
      QAs: [
        {
          question: {
            id: 555,
            question: "PLACEHOLDER QUESTION 1?",
          },
          answer: {
            id: 666,
            answer: "PLACEHOLDER ANSWER 1",
          },
        },
      ],
    },
  ]);

  //////////////////////
  //This is a mock user, this info will be available with the token of the logged in user.

  const [currentUser, setCurrentUser] = useState({
    id: 666,
    username: "email@email.com",
    name: "Placeholder Placeholder",
    roleID: 4,
    role: "ADMIN",
  });

  /////////////////
  // The below param variable gets the parameter for the axios call from the url, and then is used in the get from the /evaluations/:id
  // endpoint. It also filters and sets the reviews for the Apprentice, the Manager, and the remaining Reviewers at that time.

  let params = useParams();

  React.useEffect(() => {
    if (currentUser.id === 666 && localStorage.length !== 0) {
      let storageuser: any = localStorage.getItem("user");
      let userinfo = JSON.parse(storageuser);
      setCurrentUser(userinfo);
    }

    let token: any = localStorage.getItem("token");
    let config = {
      method: "get",
      url: baseURL + params.id,
      headers: { Authorization: token },
    };
    
    axios(config)
      .then((response) => {
        setEvaluation(response.data);
        if (apprenticeReview.reviewer.id !== evaluation.apprentice.id) {
        setApprenticeReview(
          response.data.reviews.find(
            (review: any) => review.reviewer.id === response.data.apprentice.id
          )
        )
      console.log("apprentice set!")};
        if (managerReview.reviewer.id !== evaluation.manager.id) {
        setManagerReview(
          response.data.reviews.find(
            (review: any) => review.reviewer.id === response.data.manager.id
          )
        )
      console.log("manager set!")};
      if (reviewerReviews.length <= 1){
        setReviewerReviews(
          response.data.reviews.filter(
            (review: any) =>
              review.reviewer.id !== response.data.manager.id &&
              review.reviewer.id !== response.data.apprentice.id
          )
        )
      console.log("reviewers set!");
     
      
      }})
        
     
      .catch((error) => {

        if (error.response.status >= 500) { alert("Aw beans. It's real busted.")}
 
        console.log("Error: " + error);
      });
  }, [reviewerReviews.length]);

  //////////////////
  // The following two functions display if the review needs to be marked finalized by a manager .

  function ReviewFinalizeCheckTab(review: any) {
    if (review.status.toLowerCase() === "submitted" && currentUser.roleID === 3) {
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
      (currentUser.id === review.reviewer.id || currentUser.roleID === 3)
    ) {
      return (
        <ProcessInProgressIcon
          decorative={true}
          color="colorTextIconNeutral"
          title="Finalization Needed"
          alt="Review Needs Manager Approval!"
          size="sizeIcon30"
        />
      );
    } else {
      return <></>;
    }
  }

  function ReviewFinalizeCheckHeader(review: any) {
    if (review.status.toLowerCase() === "submitted" && currentUser.roleID === 3) {
      return (
        <div id="alert">
          <Alert variant="warning">
            <Text as="span">
             <strong>This review requires manager approval.&nbsp; &nbsp;  </strong>
              Please finalize the following review at your earliest convenience.
              Thanks! &nbsp; &nbsp; <Link to={`/evaluation/${evaluation.id}/reviews/${review.id}`}><strong>Review and approve here.</strong></Link>
            
            </Text>
          </Alert>
        </div>
      );
    } else if (
      review.status.toLowerCase() === "in_progress" &&
      currentUser.id === review.reviewer.id
    ) {
      return (
        <div id="alert">
          <Alert variant="neutral">
            <Text as="span">
              <strong>Review requires completion. </strong>
              Please complete the following review at your earliest convenience. Thank
              you! <br /> <Link to={`/evaluation/${evaluation.id}/reviews/${review.id}`}><strong>Complete review here.</strong></Link>

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
      evaluation.apprentice.id === currentUser.id ||
      currentUser.roleID === 3 || currentUser.roleID === 4 ||
      apprenticeReview.status.toLowerCase() === "finalized"
    ) {
      return (
        <Tab id={tabSelectedID}>
          {ReviewFinalizeCheckTab(apprenticeReview)} Apprentice:{" "}
          {evaluation.apprentice.name}{" "}
        </Tab>
      );
    } else {
      return (
        <Tab id={tabSelectedID} disabled>
          {ReviewFinalizeCheckTab(apprenticeReview)} Apprentice:{" "}
          {evaluation.apprentice.name}{" "}
        </Tab>
      );
    }
  }

  function ManagerTab() {
    if (
      evaluation.manager.id === currentUser.id || currentUser.roleID === 3 || currentUser.roleID === 4 ||
      managerReview.status.toLowerCase() === "finalized"
    ) {
      return (
        <Tab>
          {ReviewFinalizeCheckTab(managerReview)} Manager:{" "}
          {evaluation.manager.name}{" "}
        </Tab>
      );
    } else {
      return (
        <Tab disabled>
          {ReviewFinalizeCheckTab(managerReview)} Manager:{" "}
          {evaluation.manager.name}{" "}
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
        review.status.toLowerCase() != "finalized" &&
        review.reviewer.id != currentUser.id &&
        currentUser.id != evaluation.manager.id && currentUser.roleID !== 4
      ) {
        return (
          <Tab key={review.id} disabled>
            <span>
              {ReviewFinalizeCheckTab(review)} Reviewer: {review.reviewer.name}{" "}
            </span>
          </Tab>
        );
      } else {
        return (
          <Tab key={review.id}>
            <span>
              {" "}
              {ReviewFinalizeCheckTab(review)} Reviewer: {review.reviewer.name}{" "}
            </span>
          </Tab>
        );
      }
    });
    return tabs;
  }

  function DisplayApprenticePanel() {
    if (
      apprenticeReview.status.toLowerCase() === "in_progress" &&
      currentUser.id != evaluation.apprentice.id
    ) {
      return (
        <TabPanel>
          <Box id="reviewInProgress">
            <img
              src={image}
              width="350px"
              alt="illustration of person holding computer"
              title="review not done"
            />
            <Heading as="h3" variant="heading50">
              {" "}
              Review is currently in progress. Please check back later.{" "}
            </Heading>
          </Box>
        </TabPanel>
      );
    }  else if (!apprenticeReview.QAs) {
      console.log(apprenticeReview);
      return (
        <TabPanel key={apprenticeReview.id}>
          Error! Question array for this evaluation does not exist. 
        </TabPanel>
      )
    } else {
      
      return (
        <TabPanel>
          {ReviewFinalizeCheckHeader(apprenticeReview)}
          <Heading as="h3" variant="heading30">
            Apprentice Review: {evaluation.apprentice.name}
          </Heading>
          <Stack orientation="vertical" spacing="space60">
            {apprenticeReview.QAs.map((obj, index) => (
              <Card key={index} id="QAcard">
                <Heading as="h4" variant="heading50">
                  <em>{obj.question.question}</em>
                </Heading>
                <Paragraph>{obj.answer.answer}</Paragraph>
              </Card>
            ))}
          </Stack>
        </TabPanel>
      );
    }
  }

  function DisplayManagerPanel() {
    if (
      managerReview.status.toLowerCase() === "in_progress" &&
      currentUser.id != evaluation.manager.id
    ) {
      return (
        <TabPanel>
          <Box id="reviewInProgress">
            <img
              src={image}
              width="350px"
              alt="illustration of person holding computer"
              title="review not done"
            />
            <Heading as="h3" variant="heading50">
              {" "}
              Review is currently in progress. Please check back later.{" "}
            </Heading>
          </Box>
        </TabPanel>
      );
    }  else if (!managerReview.QAs) {
      return (
        <TabPanel key={managerReview.id}>
          Error! Question array for this evaluation does not exist. 
        </TabPanel>
      )
    } else {
      return (
        <TabPanel>
          {ReviewFinalizeCheckHeader(managerReview)}
          <Heading as="h3" variant="heading30">
            Manager Reviewer: {evaluation.manager.name}
          </Heading>
          <Stack orientation="vertical" spacing="space60">
            {managerReview.QAs.map((obj, index) => (
              <Card key={index} id="QAcard">
                <Heading as="h4" variant="heading50">
                  <em>{obj.question.question}</em>
                </Heading>
                <Paragraph>{obj.answer.answer}</Paragraph>
              </Card>
            ))}
          </Stack>
        </TabPanel>
      );
    }
  }

  function DisplayReviewerPanel(review: any) {
    if (
      review.status.toLowerCase() === "in_progress" &&
      currentUser.id != review.reviewer.id
    ) {
      return (
        <TabPanel key={review.id}>
          <Box id="reviewInProgress">
            <img
              src={image}
              width="350px"
              alt="illustration of person holding computer"
              title="review not done"
            />
            <Heading as="h3" variant="heading50">
              {" "}
              Review is currently in progress. Please check back later.{" "}
            </Heading>
          </Box>
        </TabPanel>
      );
    } else if (!review.QAs) {
      return (
        <TabPanel key={review.id}>
          Error! Question array for this evaluation does not exist. 
        </TabPanel>
      )
    } 
    else {
      return (
        <TabPanel key={review.id}>
          {ReviewFinalizeCheckHeader(review)}
          <Heading as="h3" variant="heading30">
            Reviewer: {review.reviewer.name}
          </Heading>
          <Stack orientation="vertical" spacing="space60">
            {review.QAs.map((obj: any, index: any) => (
              <Card key={index} id="QAcard">
                <Heading as="h4" variant="heading50">
                  <em>{obj.question.question}</em>
                </Heading>
                <Paragraph>{obj.answer.answer}</Paragraph>
              </Card>
            ))}
          </Stack>
        </TabPanel>
      );
    }
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
          {moment(evaluation.creation).format("MM-DD-yyyy")}
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
          {DisplayApprenticePanel()}
          {DisplayManagerPanel()}
          {reviewerReviews.map((review) => DisplayReviewerPanel(review))}
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default EvaluationDetails;
