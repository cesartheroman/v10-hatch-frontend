import { queryAllByAltText } from '@testing-library/react';
import { Anchor, Card, Heading, Paragraph, Separator } from '@twilio-paste/core'
import axios from 'axios';
import { indexOf } from 'cypress/types/lodash';
import * as React from 'react'
import QAView from './Components/QAView';

type UpdateReviewAnswer = {
    id: number;
    status: string;
    reviewer: { id: number, name: string };
    QA: { question: string, answer: string }[];
}
type EvaluationSchema = {
    id: number;
    title: string;
    creation: string;
    finalized: string;
    status: string;
    questions: string[],
    apprentice: { id: number, name: string };
    manager: { id: number, name: string };
    reviews: UpdateReviewAnswer[]
}

const SingleReviewView = () => {
    const baseURL: string = 'http://localhost:3000/evaluations/'
    const [evaluationTodisplay, setEvaluationTodisplay] = React.useState<EvaluationSchema>({
        id: 4,
        title: "October evaluation",
        creation: "06/27/2022",
        finalized: "",
        status: "completed",
        questions: [""],
        apprentice: { id: 4, name: "Barack Obama" },
        manager: { id: 2, name: "Jiminy Cricket" },
        reviews: [
            {
                id: 1,
                status: "closed",
                reviewer: { id: 3, name: "Ruthie" },
                QA: [
                    {
                        question: "What are the strenghts of the apprentice?",
                        answer: "answer 1"
                    },
                    {
                        question: "What are the areas of growth for the apprentice?",
                        answer: "answer 2"
                    },
                    {
                        question: "What are the core values of the apprentice?",
                        answer: "answer3"
                    }
                ]
            }
        ]
    })

    React.useEffect(() => {
        axios.get<EvaluationSchema>(baseURL + 4).then((response) => setEvaluationTodisplay(response.data))
    }, [])

    console.log("Eval:", evaluationTodisplay)

    return (
        <div id="singleEval">
            <h4>See evaluation completed for {evaluationTodisplay.apprentice.name}</h4>
            <Paragraph>Created on: {evaluationTodisplay.creation} | Status: {evaluationTodisplay.status}</Paragraph>

            {evaluationTodisplay.reviews.map((review) =>
                <Card key={review.id}>
                    <Heading as="h2" variant="heading20" >Review by: {review.reviewer.name}</Heading>
                    <Separator orientation="horizontal" verticalSpacing="space50" />
                    <ul>
                        {review.QA.map((qa, index) => (

                            <QAView qa={qa} key={index}/>
                        ))}
                    </ul>

                </Card>
            )}


        </div>
    )
}

export default SingleReviewView


