import React, { useState } from "react";
import axios from 'axios'

import { Card, Button, Box, Label, Input } from '@twilio-paste/core'
import { useParams } from "react-router";

// type UpdateReviewAnswer = {
//     id: number;
//     status: string;
//     reviewer: object;
//     QA: { question: string, answer: string }[];
// }

// type QA = {
//     question: string,
//     answer: string
// }

const NewReview = () => {
    const baseURL: string = 'http://localhost:3000/reviews/'
    const [reviewAnswers, setReviewAnswers] = useState({
        id: 1,
        status: 'TEST',
        reviewer: { id: 1, name: "Ruthie" },
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

    React.useEffect(() => {
        axios.get(baseURL + 1).then((response) => {
            setReviewAnswers(response.data);
        });
    }, [])

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let data = {
            id: reviewAnswers.id,
            status: "submitted",
            reviewer: reviewAnswers.reviewer,
            QA: reviewAnswers.QA
        }
        axios.put(baseURL+1, data).then((response)=> {
            console.log('response from submit:', response)
        })
    }

    const updateAnswById = (answer:string, id:number) => {
        setReviewAnswers((state) => {
            return {
                ...state,
                QA: state.QA.map((el, index) => {
                    if (index===id) {
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

    console.log(reviewAnswers)
    return (
        <>
            <div style={{ maxWidth: 600, padding: 10, margin: 10 }}>
                <Card style={{ margin: '10px' }}>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <h1>Review:</h1>
                            <p>Please answer the following questions:</p>
                        
                            <Box marginBottom="space80" style={{ width: '500px' }}>
                                <Label htmlFor="q1" required>{reviewAnswers.QA[0].question}</Label>
                                <Input 
                                    id="q1" 
                                    // name="reviewAnswers.QA[0].answer" 
                                    type="text" 
                                    value={reviewAnswers.QA[0].answer}
                                    onChange={(e) => updateAnswById(e.target.value, 0) } 
                                    required 
                                />
                            </Box>
                            <Box marginBottom="space80" style={{ width: '500px' }}>
                                <Label htmlFor="q2" required>{reviewAnswers.QA[1].question}</Label>
                                <Input 
                                    id="q2" 
                                    name="q2" 
                                    type="text"
                                    value={reviewAnswers.QA[1].answer}
                                    onChange={(e) => updateAnswById(e.target.value, 1) } 
                                    required 
                                />
                            </Box>
                            <Box marginBottom="space80" style={{ width: '500px' }}>
                                <Label htmlFor="q3" required>{reviewAnswers.QA[2].question}</Label>
                                <Input 
                                    id="q3" 
                                    name="q3" 
                                    type="text"
                                    value={reviewAnswers.QA[2].answer}
                                    onChange={(e) => updateAnswById(e.target.value, 2) } 
                                    required />
                            </Box>
                            <Button type="submit" variant="primary">Submit</Button>
                        </form>
                    </div>
                </Card>
            </div>
        </>
    )
}

export default NewReview;