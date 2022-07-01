import React, { useState } from "react";
import axios from "axios";
import { Card, Button, Box, Label, Input } from "@twilio-paste/core";
/**
 * Component for fulfilling a review.
 * We receive the review throug the endpoint: /api/v1/evaluations/:id/reviews/:id
 * We make a PUT request with the answer inputs
 * This PUT modifies the evaluation object
 *
 * @component
 *
 */

type UpdateReviewAnswer = {
  reviewId: number;
  status: string;
  reviewer: { id: number; name: string };
  QA: { question: string; answer: string }[];
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
  const baseURL: string = `http://localhost:3000/evaluations/8`;
  const [reviewAnswers, setReviewAnswers] = useState<UpdateReviewAnswer>({
    reviewId: 1,
    status: "TEST",
    reviewer: { id: 3, name: "Ruthie" },
    QA: [
      {
        question: "What are the strenghts of the apprentice?",
        answer: "",
      },
      {
        question: "What are the areas of growth for the apprentice?",
        answer: "",
      },
      {
        question: "What are the core values of the apprentice?",
        answer: "",
      },
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
        status: "closed",
        QA: [
          {
            question: "What are the strenghts of the apprentice?",
            answer: "answer 1",
          },
        ],
      },
    ],
  });

  /**
   * If managerAction is true the button to close the review is displayed
   */
  const [managerAction, setManagerAction] = useState(false);

  React.useEffect(() => {
    /**
     * get single evaluation
     */
    axios.get(baseURL).then((response) => {
      setSingleEvaluation(response.data);
      let responseReviews = response.data.reviews[1];
      setReviewAnswers(responseReviews);
      //console.log(response.data)
    });
  }, []);

  React.useEffect(() => {
    /**
     * Compare evaluation manager Id with reviewer Id
     */
    if (singleEvaluation.manager.id === reviewAnswers.reviewer.id) {
      setManagerAction(true);
    }
  }, []);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    /**
     * Submit answers to review in the evaluation
     */
    e.preventDefault();
    let data = {
      id: reviewAnswers.reviewId,
      status: "submitted",
      reviewer: reviewAnswers.reviewer,
      QA: reviewAnswers.QA,
    };
    axios.put(baseURL, data).then((response) => {
      console.log("response from submit:", response);
    });
  };
  const closeReview = (e: React.MouseEvent<HTMLButtonElement>) => {
    /**
     * Close review, only available for EM annd HM
     */
    e.preventDefault();
    let data = {
      id: reviewAnswers.reviewId,
      status: "closed",
      reviewer: reviewAnswers.reviewer,
      QA: reviewAnswers.QA,
    };
    axios.put(baseURL + 1, data).then((response) => {
      console.log("response from closeReview:", response);
    });
  };

  const updateAnswById = (answer: string, id: number) => {
    /**
     * Update the answers inside the QA object in the Review
     */
    setReviewAnswers((state) => {
      return {
        ...state,
        QA: state.QA.map((el, index) => {
          if (index === id) {
            return {
              ...el,
              answer,
            };
          } else {
            return el;
          }
        }),
      };
    });
  };

  //console.log(reviewAnswers)
  //console.log(prop.evaluation)
  return (
    <>
      <div style={{ maxWidth: 600, padding: 10, margin: 10 }}>
        <Card style={{ margin: "10px" }}>
          <div>
            <form onSubmit={handleSubmit} data-testid="newreview-form">
              <h1>Review:</h1>
              <p>Please answer the following questions:</p>

              <Box marginBottom="space80" style={{ width: "500px" }}>
                <Label htmlFor="q1" required>
                  {reviewAnswers.QA[0].question}
                </Label>
                <Input
                  id="a1"
                  name="answer1"
                  type="text"
                  value={reviewAnswers.QA[0].answer}
                  onChange={(e) => updateAnswById(e.target.value, 0)}
                  required
                />
              </Box>
              <Box marginBottom="space80" style={{ width: "500px" }}>
                <Label htmlFor="q2" required>
                  {reviewAnswers.QA[1].question}
                </Label>
                <Input
                  id="a2"
                  name="answer2"
                  type="text"
                  value={reviewAnswers.QA[1].answer}
                  onChange={(e) => updateAnswById(e.target.value, 1)}
                  required
                />
              </Box>
              <Box marginBottom="space80" style={{ width: "500px" }}>
                <Label htmlFor="q3" required>
                  {reviewAnswers.QA[2].question}
                </Label>
                <Input
                  id="a3"
                  name="answer3"
                  type="text"
                  value={reviewAnswers.QA[2].answer}
                  onChange={(e) => updateAnswById(e.target.value, 2)}
                  required
                />
              </Box>
              <Button type="submit" variant="primary">
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
      </div>
    </>
  );
};

export default NewReview;
