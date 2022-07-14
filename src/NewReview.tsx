import React, { useState } from "react";
import axios from "axios";
import { Card, Button, Box, Label, Input, Toaster, useToaster } from "@twilio-paste/core";
import { useNavigate } from "react-router-dom";
/**
 * Component for fulfilling a review.
 * We receive the review throug the endpoint: /api/v1/evaluations/:id/reviews/:id
 * We make a PUT request with the answer inputs
 * This PUT modifies the evaluation object
 *
 * @component
 *
 * Constants:
 * navigate - react router for navigation
 * toaster -toaster alert
 * 
 * Hooks:
 * currentUser - logged in user
 * token - jwt grabbed from local storage
 * reviewAnswers - object that has the review QA to be completed
 * singleEvaluation - evaluation attached to the current logged in user
 * managerAction - boolean that sets the 'Finalize Review' button available when the reviewer is a manager
 * disable - boolean that disables button after form is submitted
 */
type QuestionObj = { id: number; question: string }
type AnswerObj = { id: number; answer: string }

type QA = { question: QuestionObj; answer: AnswerObj }[];
type UpdateReviewAnswer = {
  reviewId: number;
  status: string;
  reviewer: { id: number; name: string };
  QAs: QA;
};
type EvaluationSchema = {
  id: number;
  title: string;
  creation: string;
  finalized: string;
  status: string;
  questions: string[];
  apprentice: { id: number; name: string };
  manager: { id: number; name: string };
  reviews: UpdateReviewAnswer[];
};

const NewReview = () => {

  const navigate = useNavigate();
  const toaster = useToaster();
  const [currentUser, setCurrentUser] = useState({
    id: 666,
    username: "email@email.com",
    name: "Placeholder Placeholder", 
    roleID: 4,
    role: "ADMIN"
  });

  const [token, setToken] = useState("");

  const [reviewAnswers, setReviewAnswers] = useState<UpdateReviewAnswer>({
    reviewId: 1,
    status: "TEST",
    reviewer: { id: 3, name: "Ruthie" },
    QAs: [
      {
        question: {
          id: 1,
          question: "What went well?"
        },
        answer: {
          id: 13,
          answer: ""
        }
      },
      {
        question: {
          id: 2,
          question: "What didn't go well?"
        },
        answer: {
          id: 14,
          answer: ""
        }
      },
      {
        question: {
          id: 3,
          question: "What will you focus on next quarter?"
        },
        answer: {
          id: 15,
          answer: ""
        }
      }
    ],
  });
  const [singleEvaluation, setSingleEvaluation] = useState<EvaluationSchema>({
    id: 8,
    title: "Paola Test Evaluation ",
    creation: "09/03/2022",
    finalized: "",
    status: "open",
    questions: [],
    apprentice: {
      id: 1,
      name: "Apprentice Name",
    },
    manager: {
      id: 2,
      name: "Manager Name",
    },
    reviews: [
      {
        reviewId: 598112,
        reviewer: {
          id: 1,
          name: "Apprentice Name",
        },
        status: "IN_PROGRESS",
        QAs: [
          {
            question: {
              id: 1,
              question: "What went well?"
            },
            answer: {
              id: 13,
              answer: ""
            }
          }
        ],
      },
    ],
  });
  const [managerAction, setManagerAction] = useState(false);
  const [disable, setDisable] = useState(false);


  React.useEffect(() => {
    /**
     * Get current logged user token
     * Get the evaluation related to the user
    */
    if (currentUser.id === 666) {
      let storageuser: any = localStorage.getItem("user");
      let userinfo = JSON.parse(storageuser);
      let token: any = localStorage.getItem("token");

      setToken(token);
      setCurrentUser(userinfo);
    }
    getEvaluationById();
  }, []);

  React.useEffect(() => {
    /**
     * Compare evaluation manager Id with reviewer Id
     */
    if (singleEvaluation.manager.id === reviewAnswers.reviewer.id) {
      setManagerAction(true);
    }
  }, []);


  const getEvaluationById = () => {
    /**
     * Function to call a single evaluation. This evaluation will be the one 
     * that is selected by the logged in user and will set the
     * review assigned to that user.
     */
    var config = {
      method: 'GET',
      url: `http://localhost:9876/v1/api/users/${currentUser.id}/evaluations`,
      headers: {Authorization: token}
    };

    axios(config)
      .then(function (response) {
        setSingleEvaluation(response.data)
        let reviewToComplete = response.data.reviews.filter((rev: UpdateReviewAnswer) => rev.reviewer.id === currentUser.id)
        setReviewAnswers(reviewToComplete[0])
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    /**
     * Submit answers to review in the evaluation
     */
    e.preventDefault();
    let data = {
      status: "SUBMITTED",
      QAs: [
        {
          answer: {
            id: reviewAnswers.QAs[0].answer.id,
            answer: reviewAnswers.QAs[0].answer.answer
          }
        },
        {
          answer: {
            id: reviewAnswers.QAs[1].answer.id,
            answer: reviewAnswers.QAs[1].answer.answer
          }
        },
        {
          answer: {
            id: reviewAnswers.QAs[2].answer.id,
            answer: reviewAnswers.QAs[2].answer.answer
          }
        }
      ]
    };
    var config = {
      method: 'PATCH',
      url: `http://localhost:9876/v1/api/evaluations/${singleEvaluation.id}/reviews/${reviewAnswers.reviewId}/`,
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then((response) => {
        // console.log("PATCH response,data", response.data);
        if (response.status === 200) {
          toaster.push({
            message: "Review submitted succesfully",
            variant: "success",
          });
        }
      })
      .catch(err => console.log(err))
      .finally(() => setDisable(true))
  };
  const closeReview = (e: React.MouseEvent<HTMLButtonElement>) => {
    /**
     * Close review, only available for EM annd HM
     */
    e.preventDefault();
    let data = {
      status: "FINALIZED"
    };
    var config = {
      method: 'PATCH',
      url: `http://localhost:9876/v1/api/evaluations/${singleEvaluation.id}/reviews/${reviewAnswers.reviewId}/`,
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then((response) => {
        console.log("PATCH response,data", response.data);
        if (response.status === 200) {
          toaster.push({
            message: "Review finalized succesfully",
            variant: "success",
          });
        }
      })
      .catch(err => console.log(err))
      .finally(() => navigate('/'))
  };

  const updateAnswById = (answer: string, id: number) => {
    /**
     * Update the answers in the QA array of the reviewAnswers
    */
    const ansToUpdate = reviewAnswers.QAs.find(ans => ans.answer.id === id)
    const ansToUpdateIndex = reviewAnswers.QAs.indexOf(ansToUpdate!)
    reviewAnswers.QAs.splice(ansToUpdateIndex,1, {
      question: {id: reviewAnswers.QAs[ansToUpdateIndex].question.id, question: reviewAnswers.QAs[ansToUpdateIndex].question.question},
      answer: {id, answer}
    })
  };

  return (
    <>
      <div style={{ maxWidth: 600, padding: 10, margin: 10 }}>
        {reviewAnswers.status !== "FINALIZED" ?
          <>
            <Toaster {...toaster} />
            <Card style={{ margin: "10px" }}>
              <div>
                <form onSubmit={handleSubmit} data-testid="newreview-form">
                  <h1>Review:</h1>
                  <p>Please answer the following questions:</p>

                  <Box marginBottom="space80" style={{ width: "500px" }}>
                    <Label htmlFor="q1" required>
                      {reviewAnswers.QAs[0].question.question}
                    </Label>
                    <Input
                      name="answer1"
                      type="text"
                      onChange={(e) => updateAnswById(e.target.value, reviewAnswers.QAs[0].answer.id)}
                      required
                    />
                  </Box>
                  <Box marginBottom="space80" style={{ width: "500px" }}>
                    <Label htmlFor="q2" required>
                      {reviewAnswers.QAs[1].question.question}
                    </Label>
                    <Input
                      name="answer2"
                      type="text"
                      onChange={(e) => updateAnswById(e.target.value, reviewAnswers.QAs[1].answer.id)}
                      required
                    />
                  </Box>
                  <Box marginBottom="space80" style={{ width: "500px" }}>
                    <Label htmlFor="q3" required>
                      {reviewAnswers.QAs[2].question.question}
                    </Label>
                    <Input
                      name="answer3"
                      type="text"
                      onChange={(e) => updateAnswById(e.target.value, reviewAnswers.QAs[2].answer.id)}
                      required
                    />
                  </Box>

                  <Button type="submit" variant="primary" disabled={disable}>
                    Submit
                  </Button>

                  {managerAction && (
                    <Button type="submit" variant="primary" onClick={closeReview}>
                      Close Review
                    </Button>
                  )}
                </form>
              </div>
            </Card>
          </>
          :
          <p>You have completed your task</p>
        }


      </div>
    </>
  );
};

export default NewReview;
