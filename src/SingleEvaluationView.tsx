import { Card, Heading, Paragraph, Separator, Stack, Tab, TabList, TabPanel, TabPanels, Tabs } from '@twilio-paste/core'
import axios from 'axios';
import * as React from 'react'
import { useUID } from 'react-uid';
import QAView from './Components/QAView';

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

const SingleEvaluationView = () => {
    const selectedId = useUID();
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
    const [apprenticeReview, setApprenticeReview] = React.useState<UpdateReviewAnswer[]>([])
    const [reviewerReview, setReviewerReview] = React.useState<UpdateReviewAnswer[]>([])
    const [managerReview, setManagerReview] = React.useState<UpdateReviewAnswer[]>([])

    const user = {
        id: 2,
        name: "Ruthie Clark",
        roleID: 3,
        email: "ruthie@elias.com"
    }

    React.useEffect(() => {
        axios.get<EvaluationSchema>(baseURL + 8).then((response) =>
            setEvaluationTodisplay(response.data)
        )
    }, [])
    React.useEffect(() => {

        setApprenticeReview(evaluationTodisplay.reviews.filter((review) => (
            review.reviewer.id === evaluationTodisplay.apprentice.id  
        )));
        setManagerReview(evaluationTodisplay.reviews.filter((review) => (
            review.reviewer.id === evaluationTodisplay.manager.id
        )));
        setReviewerReview(evaluationTodisplay.reviews.filter((review) => (
            review.reviewer.id !== evaluationTodisplay.manager.id && review.reviewer.id !== evaluationTodisplay.apprentice.id
        )));
    }, [evaluationTodisplay])




    //console.log("Eval:", evaluationTodisplay)
    // console.log("submitted", needReview)
    return (
        <div id='singleEval'>
            <Heading as="h2" variant="heading20">
                {evaluationTodisplay.title} for: {evaluationTodisplay.apprentice.name}
            </Heading>
            {/* // Hatch Manager View: */}
            {user.roleID === 3 &&
                <div id='singleEval'>
                    <Tabs orientation="vertical" selectedId={selectedId} baseId="vertical-tabs-example" >
                        <TabList aria-label="Vertical product tabs">
                            <Tab id={selectedId}>Apprentice</Tab>
                            <Tab>Manager</Tab>
                            <Tab>Reviewer</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <Heading as="h3" variant="heading30">Apprentice </Heading>
                                <Stack orientation="vertical" spacing="space60">
                                    {apprenticeReview.map((review) =>
                                        <Card key={review.id}>
                                            <Heading as="h5" variant="heading30" >Review assigned to: {review.reviewer.name}</Heading>
                                            <Paragraph>Review status: {review.status}</Paragraph>
                                            <Separator orientation="horizontal" verticalSpacing="space50" />
                                            <ul>
                                                {review.QA.map((qa, index) => (

                                                    <QAView qa={qa} key={index} />
                                                ))}
                                            </ul>

                                        </Card>
                                    )}
                                </Stack>
                            </TabPanel>
                            <TabPanel>
                                <Heading as="h3" variant="heading30">Manager</Heading>
                                <Stack orientation="vertical" spacing="space60">
                                    {managerReview.map((review) =>
                                        <Card key={review.id}>
                                            <Heading as="h5" variant="heading30" >Review assigned to: {review.reviewer.name}</Heading>
                                            <Paragraph>Review status: {review.status}</Paragraph>
                                            <Separator orientation="horizontal" verticalSpacing="space50" />
                                            <ul>
                                                {review.QA.map((qa, index) => (

                                                    <QAView qa={qa} key={index} />
                                                ))}
                                            </ul>

                                        </Card>
                                    )}
                                </Stack>
                            </TabPanel>
                            <TabPanel>
                                <Heading as="h3" variant="heading30">Reviewer</Heading>
                                {reviewerReview.map((review) =>
                                    <Card key={review.id}>
                                        <Heading as="h5" variant="heading30" >Review assigned to: {review.reviewer.name}</Heading>
                                        <Paragraph>Review status: {review.status}</Paragraph>
                                        <Separator orientation="horizontal" verticalSpacing="space50" />
                                        <ul>
                                            {review.QA.map((qa, index) => (

                                                <QAView qa={qa} key={index} />
                                            ))}
                                        </ul>

                                    </Card>
                                )}
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </div>
            }
            {/* Reviewer View: */}
            {user.roleID === 1 &&
                <div id='singleEval'>
                    <Tabs orientation="vertical" selectedId={selectedId} baseId="vertical-tabs-example" >
                        <TabList aria-label="Vertical product tabs">
                            <Tab disabled>Apprentice</Tab>
                            <Tab disabled>Manager</Tab>
                            <Tab id={selectedId}>Reviewer</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <Heading as="h3" variant="heading30">Apprentice </Heading>
                                <Stack orientation="vertical" spacing="space60">
                                    {apprenticeReview.map((review) =>
                                        <Card key={review.id}>
                                            <Heading as="h5" variant="heading30" >Review assigned to: {review.reviewer.name}</Heading>
                                            <Separator orientation="horizontal" verticalSpacing="space50" />
                                            <ul>
                                                {review.QA.map((qa, index) => (

                                                    <QAView qa={qa} key={index} />
                                                ))}
                                            </ul>

                                        </Card>
                                    )}
                                </Stack>
                            </TabPanel>
                            <TabPanel>
                                <Heading as="h3" variant="heading30">Manager</Heading>
                                <Stack orientation="vertical" spacing="space60">
                                    {managerReview.map((review) =>
                                        <Card key={review.id}>
                                            <Heading as="h5" variant="heading30" >Review assigned to: {review.reviewer.name}</Heading>
                                            <Separator orientation="horizontal" verticalSpacing="space50" />
                                            <ul>
                                                {review.QA.map((qa, index) => (

                                                    <QAView qa={qa} key={index} />
                                                ))}
                                            </ul>

                                        </Card>
                                    )}
                                </Stack>
                            </TabPanel>
                            <TabPanel>
                                <Heading as="h3" variant="heading30">Reviewer</Heading>
                                {reviewerReview.map((review) =>
                                    <Card key={review.id}>
                                        <Heading as="h5" variant="heading30" >Review assigned to: {review.reviewer.name}</Heading>
                                        <Separator orientation="horizontal" verticalSpacing="space50" />
                                        <ul>
                                            {review.QA.map((qa, index) => (

                                                <QAView qa={qa} key={index} />
                                            ))}
                                        </ul>

                                    </Card>
                                )}
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </div>

            }
            {/* Reviewer View: */}
            {user.roleID === 2 &&
                <div id='singleEval'>
                    <Tabs orientation="vertical" selectedId={selectedId} baseId="vertical-tabs-example" >
                        <TabList aria-label="Vertical product tabs">
                            <Tab id={selectedId}>Apprentice</Tab>
                            <Tab disabled>Manager</Tab>
                            <Tab disabled>Reviewer</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <Heading as="h3" variant="heading30">Apprentice </Heading>
                                <Stack orientation="vertical" spacing="space60">
                                    {apprenticeReview.map((review) =>
                                        <Card key={review.id}>
                                            <Heading as="h5" variant="heading30" >Review assigned to: {review.reviewer.name}</Heading>
                                            <Separator orientation="horizontal" verticalSpacing="space50" />
                                            <ul>
                                                {review.QA.map((qa, index) => (

                                                    <QAView qa={qa} key={index} />
                                                ))}
                                            </ul>

                                        </Card>
                                    )}
                                </Stack>
                            </TabPanel>
                            <TabPanel>
                                <Heading as="h3" variant="heading30">Manager</Heading>
                                <Stack orientation="vertical" spacing="space60">
                                    {managerReview.map((review) =>
                                        <Card key={review.id}>
                                            <Heading as="h5" variant="heading30" >Review assigned to: {review.reviewer.name}</Heading>
                                            <Separator orientation="horizontal" verticalSpacing="space50" />
                                            <ul>
                                                {review.QA.map((qa, index) => (

                                                    <QAView qa={qa} key={index} />
                                                ))}
                                            </ul>

                                        </Card>
                                    )}
                                </Stack>
                            </TabPanel>
                            <TabPanel>
                                <Heading as="h3" variant="heading30">Reviewer</Heading>
                                {reviewerReview.map((review) =>
                                    <Card key={review.id}>
                                        <Heading as="h5" variant="heading30" >Review assigned to: {review.reviewer.name}</Heading>
                                        <Separator orientation="horizontal" verticalSpacing="space50" />
                                        <ul>
                                            {review.QA.map((qa, index) => (

                                                <QAView qa={qa} key={index} />
                                            ))}
                                        </ul>

                                    </Card>
                                )}
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </div>

            }

        </div>

    );




}

export default SingleEvaluationView


