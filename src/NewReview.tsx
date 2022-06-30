import React, { useState } from "react";
import axios from 'axios'

import { Card, Button, Box, Label, Input } from '@twilio-paste/core'

type UpdateReviewAnswer = {
    id: number;
    status: string;
    reviewer: {id:number, name:string};
    QA: { question: string, answer: string }[];
}
type EvaluationSchema = {
    title: string;
    creation: string;
    finalized: string;
    status: string;
    questions: string[];
    arprentice: {id: number,name: string},
    manager: {id: number, name: string},
    reviews: { reviewId: number, reviewer: string }[];
}


const NewReview = (prop: {evaluation: EvaluationSchema}) => {
    const baseURL: string = `http://localhost:3000/evaluations/`
    const [reviewAnswers, setReviewAnswers] = useState<UpdateReviewAnswer>({
        id: 1,
        status: 'TEST',
        reviewer: { id: 3, name: "Ruthie" },
        QA: [
            {
                question: "What are the strenghts of the apprentice?",
                answer: ""
            },
            {
                question: "What are the areas of growth for the apprentice?",
                answer: ""
            },
            {
                question: "What are the core values of the apprentice?",
                answer: ""
            }
        ]
    })
    const [managerAction, setManagerAction] = useState(false)

  
       

    React.useEffect(() => {
        axios.get(baseURL + 4).then((response) => {
            // setReviewAnswers(response.data.reviews[1]);
            console.log(response.data.reviews[1])
        });
    }, [])

    React.useEffect(() => {
        if (prop.evaluation.manager.id === reviewAnswers.reviewer.id) {
            setManagerAction(true);
        }
    }, [])

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let data = {
            id: reviewAnswers.id,
            status: "submitted",
            reviewer: reviewAnswers.reviewer,
            QA: reviewAnswers.QA
        }
        axios.put(baseURL + 1, data).then((response) => {
            console.log('response from submit:', response)
        })
    }
    const closeReview = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let data = {
            id: reviewAnswers.id,
            status: "closed",
            reviewer: reviewAnswers.reviewer,
            QA: reviewAnswers.QA
        }
        axios.put(baseURL + 1, data).then((response) => {
            console.log('response from closeReview:', response)
        })
    }

    const updateAnswById = (answer: string, id: number) => {
        setReviewAnswers((state) => {
            return {
                ...state,
                QA: state.QA.map((el, index) => {
                    if (index === id) {
                        return {
                            ...el,
                            answer
                        }
                    } else {
                        return el
                    }
                })
            }
        })
    }



    //console.log(reviewAnswers)
    console.log(prop.evaluation)
    return (
        <>
            <div style={{ maxWidth: 600, padding: 10, margin: 10 }}>
                <Card style={{ margin: '10px' }}>
                    <div>
                        <form onSubmit={handleSubmit} data-testid="newreview-form">
                            <h1>Review:</h1>
                            <p>Please answer the following questions:</p>

                            <Box marginBottom="space80" style={{ width: '500px' }}>
                                <Label htmlFor="q1" required>{reviewAnswers.QA[0].question}</Label>
                                <Input
                                    id="a1"
                                    name="answer1"
                                    type="text"
                                    value={reviewAnswers.QA[0].answer}
                                    onChange={(e) => updateAnswById(e.target.value, 0)}
                                    required
                                />
                            </Box>
                            <Box marginBottom="space80" style={{ width: '500px' }}>
                                <Label htmlFor="q2" required>{reviewAnswers.QA[1].question}</Label>
                                <Input
                                    id="a2"
                                    name="answer2"
                                    type="text"
                                    value={reviewAnswers.QA[1].answer}
                                    onChange={(e) => updateAnswById(e.target.value, 1)}
                                    required
                                />
                            </Box>
                            <Box marginBottom="space80" style={{ width: '500px' }}>
                                <Label htmlFor="q3" required>{reviewAnswers.QA[2].question}</Label>
                                <Input
                                    id="a3"
                                    name="answer3"
                                    type="text"
                                    value={reviewAnswers.QA[2].answer}
                                    onChange={(e) => updateAnswById(e.target.value, 2)}
                                    required />
                            </Box>
                            <Button type="submit" variant="primary">Submit</Button>
                            {managerAction &&
                                <Button type="submit" variant="primary" onClick={closeReview} >Close Review</Button>
                            }
                        </form>
                    </div>
                </Card>
            </div>
        </>
    )
}

export default NewReview;