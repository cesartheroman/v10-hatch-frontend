import React, { useState } from "react";
import axios from "axios";
import { Card, Button, Box, Label, Input, Toaster, useToaster, Heading, TextArea } from "@twilio-paste/core";
import { useNavigate, useParams } from "react-router-dom";
import image from "./news.png";

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
 * params - get parameter from URL for the evaluation
 * 
 * Hooks:
 * currentUser - logged in user
 * token - jwt grabbed from local storage
 * reviewToBeSubmittedByLoggedInUser - object that has the review QA to be completed
 * singleEvaluation - evaluation attached to the current logged in user
 * managerAction - boolean that sets the 'Finalize Review' button available when the reviewer is a manager
 * disable - boolean that disables button after form is submitted
 * ansToUpdate - the QA object to be updated in the from
 * ansToUpdateIndex - the index of the QA object inside the QA array. Used to mark what QA obj is being updated
 */
type QuestionObj = { id: number; question: string }
type AnswerObj = { id: number; answerText: string }

type QA = { question: QuestionObj; answer: AnswerObj }[];
type UpdateReviewAnswer = {
  id: number;
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
  const BASE_URL = "http://localhost:9876/v1/api/evaluations"
  const navigate = useNavigate();
  const toaster = useToaster();
  let params = useParams();

  const [token, setToken] = useState("");
  const [disable, setDisable] = useState(false);
  const [reviewToClose, setReviewToClose] = useState(
    {
      id: 1,
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
            answerText: ""
          }
        },
        {
          question: {
            id: 2,
            question: "What didn't go well?"
          },
          answer: {
            id: 14,
            answerText: ""
          }
        },
        {
          question: {
            id: 3,
            question: "What will you focus on next quarter?"
          },
          answer: {
            id: 15,
            answerText: ""
          }
        }
      ],
    }
  );
  const [reviewsInProgress, setReviewsInProgress] = useState([
    {
      id: 1,
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
            answerText: ""
          }
        },
        {
          question: {
            id: 2,
            question: "What didn't go well?"
          },
          answer: {
            id: 14,
            answerText: ""
          }
        },
        {
          question: {
            id: 3,
            question: "What will you focus on next quarter?"
          },
          answer: {
            id: 15,
            answerText: ""
          }
        }
      ],
    }
  ]);
  const [reviewsFinalized, setReviewsFinalized] = useState([
    {
      id: 1,
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
            answerText: ""
          }
        },
        {
          question: {
            id: 2,
            question: "What didn't go well?"
          },
          answer: {
            id: 14,
            answerText: ""
          }
        },
        {
          question: {
            id: 3,
            question: "What will you focus on next quarter?"
          },
          answer: {
            id: 15,
            answerText: ""
          }
        }
      ],
    }
  ]);
  const [qasAnswered, setQasAnswered] = useState([{
    question: {
      id: 1,
      question: "What went well? test"
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
  }])
  const [currentUser, setCurrentUser] = useState({
    id: 666,
    username: "email@email.com",
    name: "Placeholder Placeholder",
    roleID: 4,
    role: "ADMIN"
  });
  const [reviewToBeSubmittedByLoggedInUser, setReviewToBeSubmittedByLoggedInUser] = useState<UpdateReviewAnswer>({
    id: 1,
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
          answerText: ""
        }
      },
      {
        question: {
          id: 2,
          question: "What didn't go well?"
        },
        answer: {
          id: 14,
          answerText: ""
        }
      },
      {
        question: {
          id: 3,
          question: "What will you focus on next quarter?"
        },
        answer: {
          id: 15,
          answerText: ""
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
        id: 598112,
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
              answerText: ""
            }
          }
        ],
      },
    ],
  });



  React.useEffect(() => {

    getEvaluationById();
  }, [currentUser.id]);



  const getEvaluationById = () => {
    /**
    * Get current logged user token
    * Get the evaluation related to the user
   */

    let storageuser: any = localStorage.getItem("user");
    let userinfo = JSON.parse(storageuser);
    let token: any = localStorage.getItem("token");

    setToken(token);
    setCurrentUser(userinfo);

    /**
     * Function to call a single evaluation. This evaluation will be the one 
     * that is selected by the logged in user and will set the
     * review assigned to that user.
     */
    let getEvaluation = `${BASE_URL}/${params.evalId}`
    // let getReviewToFulfill = `${BASE_URL}/${params.evalId}/reviews/${params.reviewId}`
    let revId = params.reviewId

    if (currentUser.id !== 666) {
      axios.get(getEvaluation, { headers: { Authorization: token } })
        .then(function (response) {
          setSingleEvaluation(response.data)
          setReviewToBeSubmittedByLoggedInUser(response.data.reviews.find((rev: any) => rev.reviewer.id === currentUser.id))
          setReviewToClose(response.data.reviews.find((rev: any) => rev.status === "SUBMITTED" && rev.id === Number(revId)))
          setQasAnswered((response.data.reviews.find((rev: any) => rev.status === "SUBMITTED" && rev.id === Number(revId))).QAs)
        })
        .catch(function (error) {
          console.log(error);
        });
    }

  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    /**
     * Submit answers to review in the evaluation
     */
    console.log("on submit reviewAnswr", reviewToBeSubmittedByLoggedInUser)
    e.preventDefault();
    let data = {
      status: "SUBMITTED",
      QAs: reviewToBeSubmittedByLoggedInUser.QAs
    };
    var config = {
      method: 'PATCH',
      url: `${BASE_URL}/${singleEvaluation.id}/reviews/${reviewToBeSubmittedByLoggedInUser.id}/`,
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
      url: `${BASE_URL}/${singleEvaluation.id}/reviews/${reviewToClose.id}/`,
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

  const updateAnswById = (answerText: string, id: number) => {
    /**
     * Update the answers in the QA array of the reviewToBeSubmittedByLoggedInUser
    */
    /**
     * Copy the original array from the `reviewToBeSubmittedByLoggedInUser` state so we aren't mutating it in-place
     * */
    let questionsAndAnswers = [...reviewToBeSubmittedByLoggedInUser.QAs];

    /**
     * Find the object containing the answer with the provided id, if it exists
     * */
    const questionAndAnswer = questionsAndAnswers.find(
      (questionAndAnswer) => questionAndAnswer.answer.id === id
    );

    /**
     * If no such question + answer object with the provided answerId exists, there's nothing to update
     * */
    if (questionAndAnswer == null) { return; }

    const index = questionsAndAnswers.indexOf(questionAndAnswer);
    if (index < 0) { return; }

    /**
     * Updated version of QA
     * */
    const updatedQuestionAndAnswer = {
      ...questionAndAnswer,
      answer: {
        ...questionAndAnswer.answer,
        answer: answerText
      }
    };
    /**
     * Replace object at the index with updated version
     * */
    questionsAndAnswers.splice(index, 1, updatedQuestionAndAnswer);

    /**
     * Set Review Answers with new answers submitted by user
     * */
    setReviewToBeSubmittedByLoggedInUser((prevReviewToBeSubmittedByLoggedInUser) => {
      return { ...prevReviewToBeSubmittedByLoggedInUser, QAs: questionsAndAnswers };
    })

  };

  function reviewFormForApprenticeOrReviewerToSubmit() {

      return (
        <>
          <Toaster {...toaster} />
          <Card id="review-form-card">

            <form onSubmit={handleSubmit} data-testid="newreview-form" id="review-form">
              <h1>Review for {singleEvaluation.apprentice.name}</h1>
              <p>Please answer the following questions:</p>
              {reviewToBeSubmittedByLoggedInUser.QAs.map((qa, index) => (
                <Box marginBottom="space80" style={{ width: "500px" }} key={index}>
                  <Label htmlFor="q1" required>
                    {qa.question.question}
                  </Label>
                  <TextArea onChange={(e) => updateAnswById(e.target.value, qa.answer.id)} aria-describedby="message_help_text" id="message" name="message" required />
                </Box>
              ))}
              <div id="buttons-review">
                <Button type="submit" variant="primary" disabled={disable}>
                  Submit
                </Button>
              </div>

            </form>

          </Card>
        </>
      )
    
  }

  function reviewFormForManagerToSubmit() {
   
      return (
        <>
          <Toaster {...toaster} />
          <Card id="review-form-card">

            <form onSubmit={handleSubmit} data-testid="newreview-form" id="review-form">
              <h1>Review for {singleEvaluation.apprentice.name}</h1>
              <p>Please answer the following questions:</p>
              {reviewToBeSubmittedByLoggedInUser.QAs.map((qa, index) => (
                <Box marginBottom="space80" style={{ width: "500px" }} key={index}>
                  <Label htmlFor="q1" required>
                    {qa.question.question}
                  </Label>
                  <TextArea onChange={(e) => updateAnswById(e.target.value, qa.answer.id)} aria-describedby="message_help_text" id="message" name="message" required />
                </Box>
              ))}
              <div id="buttons-review">
                <Button type="submit" variant="primary" disabled={disable}>
                  Submit
                </Button>
          
               <Button type="submit" variant="primary" onClick={closeReview}>
                 Close Review
               </Button>
   

              </div>

            </form>

          </Card>
        </>
      )
  
  }

  function reviewFormForManagerToApprove() {
      return (
        <>
          <Toaster {...toaster} />
          <Card id="review-form-card">

           
              <h1>Review for {singleEvaluation.apprentice.name} </h1>
              <h3>Completed by: {reviewToClose.reviewer.name}</h3>
              <p>Please approve the following review:</p>
              <ol>
              {qasAnswered.map((qa, index) => (
                <Box marginBottom="space80" style={{ width: "500px" }} key={index}>
                  
                  <li>{qa.question.question}</li>
                  <p style={{backgroundColor: "lightgrey", padding:10, borderRadius:5}}>{qa.answer.answer}</p>
                </Box>
              ))}
              </ol>
              
              <div id="buttons-review">
                <Button type="submit" variant="primary" onClick={closeReview}>
                  Approve and Close Review
                </Button>
              </div>
      

          </Card>
        </>
      )
   
  }

  function finalizedReviewView() {

      return (
        <>
          <Box id="reviewInProgress">
            <img
              src={image}
              width="350px"
              alt="illustration of person holding computer"
              title="review finalized"
            />
            <Heading as="h3" variant="heading50">
              {" "}This review is finalized, it cannot be editted at this time.{" "}
            </Heading>
          </Box>
        </>
      )
   
  }

console.log("current eval", singleEvaluation);
console.log("current review to close", reviewToClose)
  return (
    <>

      <Box margin="space100">
        {
        (reviewToBeSubmittedByLoggedInUser.status === "In_Progress" && (currentUser.roleID === 1 || currentUser.roleID === 2)) 
        && reviewFormForApprenticeOrReviewerToSubmit()
        }
        {
          ((currentUser.roleID === 3 || currentUser.roleID === 4) && reviewToBeSubmittedByLoggedInUser.status === "In_Progress")
          && reviewFormForManagerToSubmit()
        }
        {
          (reviewToClose && (currentUser.roleID === 3 || currentUser.roleID === 4))
          && reviewFormForManagerToApprove()
        }
        {
          (reviewToBeSubmittedByLoggedInUser.status === "FINALIZED")
          && finalizedReviewView()
        }
   

        {/* {reviewToBeSubmittedByLoggedInUser.status !== 'FINALIZED' ?
          <>
            <Toaster {...toaster} />
            <Card id="review-form-card">

              <form onSubmit={handleSubmit} data-testid="newreview-form" id="review-form">
                <h1>Review for {singleEvaluation.apprentice.name}</h1>
                <p>Please answer the following questions:</p>
                {reviewToBeSubmittedByLoggedInUser.QAs.map((qa, index) => (
                  <Box marginBottom="space80" style={{ width: "500px" }} key={index}>
                    <Label htmlFor="q1" required>
                      {qa.question.question}
                    </Label>
                    <TextArea onChange={(e) => updateAnswById(e.target.value, qa.answer.id)} aria-describedby="message_help_text" id="message" name="message" required />
                  </Box>
                ))}
                <div id="buttons-review">
                  <Button type="submit" variant="primary" disabled={disable}>
                    Submit
                  </Button>

                  {singleEvaluation.manager.id === reviewToBeSubmittedByLoggedInUser.reviewer.id && (
                    <Button type="submit" variant="primary" onClick={closeReview}>
                      Close Review
                    </Button>
                  )}

                </div>

              </form>

            </Card>
          </>
          :
          <>

            <Box id="reviewInProgress">
              <img
                src={image}
                width="350px"
                alt="illustration of person holding computer"
                title="review finalized"
              />
              <Heading as="h3" variant="heading50">
                {" "}
                This review is finalized, it cannot be editted at this time.{" "}
              </Heading>
            </Box>
          </>
        }*/}

      </Box> 
    </>
  );
};

export default NewReview;

