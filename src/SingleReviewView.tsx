import { Anchor, Card, Heading, Paragraph } from '@twilio-paste/core'
import axios from 'axios';
import * as React from 'react'

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

    // React.useEffect(() => {
    //     axios.get<EvaluationSchema>(baseURL+4).then((response) => {
    //         setEvaluationTodisplay(response);
    //     })
    // }, [])

    return (
        <Card>
            <Heading as="h2" variant="heading20" >See evaluation completed for *apprentice*</Heading>
            <Paragraph>Question 1</Paragraph>
                <Paragraph>Answer 1</Paragraph>
                <Paragraph>Answer 2</Paragraph>
                <Paragraph>Answer 3</Paragraph>
            <Paragraph>Question 2</Paragraph>
                <Paragraph>Answer 1</Paragraph>
                <Paragraph>Answer 2</Paragraph>
                <Paragraph>Answer 3</Paragraph>
            <Paragraph>Question 3</Paragraph>
                <Paragraph>Answer 1</Paragraph>
                <Paragraph>Answer 2</Paragraph>
                <Paragraph>Answer 3</Paragraph>
        </Card>
    )
}

export default SingleReviewView