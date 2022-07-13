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
  const baseURL: string = `http://localhost:3000/reviews/3`;
  const navigate = useNavigate();
  const toaster = useToaster();
  const [answers, setAnswers] = useState<AnswerObj>({id: 13, answer: ""})
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
    /**
     * Evaluation format - typescript needs a mock object to reference the hook
     */
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

  /**
   * If managerAction is true the button to close the review is displayed
   */
  const [managerAction, setManagerAction] = useState(false);
  const [disable, setDisable] = useState(false);


  React.useEffect(() => {
    getEvaluation();
  }, []);

  React.useEffect(() => {
    /**
     * Compare evaluation manager Id with reviewer Id
     */
    if (singleEvaluation.manager.id === reviewAnswers.reviewer.id) {
      setManagerAction(true);
    }
  }, []);


  /**
   * Mocked logged in user
  */
  const user = {
    id: 12,
    name: "David A",
    roleID: 1,
    email: "ruthie@elias.com"
  }


  const getEvaluation = () => {
    /**
     * Function to call a single evaluation. This evaluation will be the one 
     * that is selected by the logged in user and will set the
     * review assigned to that user.
     */
    var config = {
      method: 'get',
      url: 'http://localhost:9876/v1/api/evaluations/1',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMiIsInJvbGUiOiJBUFBSRU5USUNFIiwidXNlciI6ImRhdmlkQHR3aWxpby5jb20iLCJ1c2VySUQiOiIxMiIsImlhdCI6MTY1Nzc0NDQ5OSwiZXhwIjoxNjU3NzQ2Mjk5LCJqdGkiOiJXekp4MFJvSjVkeE9FUUlXT2VEeXVBIn0.qWoXHKCNKQRy0fsMaV1S1ZeIyqsHcOgw-l55_3AM5A8'
      }
    };

    axios(config)
      .then(function (response) {
        console.log("response.data", response.data);
        setSingleEvaluation(response.data)
        let reviewToComplete = response.data.reviews.filter((rev: UpdateReviewAnswer) => rev.reviewer.id === user.id)
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
    console.log("Whats being subimtted:", reviewAnswers)
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
      method: 'patch',
      url: 'http://localhost:9876/v1/api/evaluations/3/reviews/5/',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMiIsInJvbGUiOiJBUFBSRU5USUNFIiwidXNlciI6ImRhdmlkQHR3aWxpby5jb20iLCJ1c2VySUQiOiIxMiIsImlhdCI6MTY1Nzc0NDQ5OSwiZXhwIjoxNjU3NzQ2Mjk5LCJqdGkiOiJXekp4MFJvSjVkeE9FUUlXT2VEeXVBIn0.qWoXHKCNKQRy0fsMaV1S1ZeIyqsHcOgw-l55_3AM5A8',
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then((response) => {
        console.log("PATCH response,data", response.data);
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
    axios
      .patch(baseURL, data)
      .then((response) => {
        console.log("response from submit:", response);
        if (response.status === 200) {
          toaster.push({
            message: "Review finalized succesfully",
            variant: "success",
          });
        }
      })
      .catch(err => console.log(err))
      .finally(() => navigate('/'));
  };

  const updateAnswById = (answer: string, id: number) => {
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
                      //value={reviewAnswers.QAs[0].answer.answer}
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
                      //value={reviewAnswers.QAs[1].answer.answer}
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
                      //value={reviewAnswers.QAs[2].answer.answer}
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
