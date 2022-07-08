import { Card, Heading, Paragraph, Separator, Stack, Tab, TabList, TabPanel, TabPanels, Tabs } from '@twilio-paste/core'
import axios from 'axios';
import * as React from 'react'
import { useParams } from 'react-router-dom';
import { useUID } from 'react-uid';
import { stringify } from 'ts-jest';
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
    const baseURL: string = 'http://localhost:3000/evaluations/'
    const [evaluationTodisplay, setEvaluationToDisplay] = React.useState<EvaluationSchema>({
        id: 69,
        title: "PLACEHOLDER TITLE",
        creation: "06/27/2022",
        finalized: "06/28/2022",
        status: "completed",
        questions: [""],
        apprentice: { id: 4, name: "PLACEHOLDER APPRENTICE" },
        manager: { id: 2, name: "PLACEHOLDER MANAGER" },
        reviews: [
            {
                id: 1,
                status: "closed",
                reviewer: { id: 3, name: "PLACEHOLDER REVIEWER" },
                QA: [
                    {
                        question: "PLACEHOLDER QUESTION 1?",
                        answer: "PLACEHOLDER ANSWER 1"
                    },
                    {
                        question: "PLACEHOLDER QUESTION 2?",
                        answer: "PLACEHOLDER ANSWER 2"
                    },
                    {
                        question: "PLACEHOLDER QUESTION 3?",
                        answer: "PLACEHOLDER ANSWER 3"
                    }
                ]
            }
        ]
    })
    const [apprenticeReview, setApprenticeReview] = React.useState<UpdateReviewAnswer[]>([])
    const [reviewerReview, setReviewerReview] = React.useState<UpdateReviewAnswer[]>([])
    const [managerReview, setManagerReview] = React.useState<UpdateReviewAnswer[]>([])

    //////////////////////
    //This is a mock user, this info will be available with the token of the logged in user
    const user = {
        id: 2,
        name: "Ruthie Clark",
        roleID: 3,
        email: "ruthie@elias.com"
    }



    let params = useParams();
    let evaluationID = params.id;
    React.useEffect(() => {
        axios.get<EvaluationSchema>(baseURL + evaluationID).then((response) => {
            setEvaluationToDisplay(response.data);
            setApprenticeReview(response.data.reviews.filter((review) => (
                review.reviewer.id === evaluationTodisplay.apprentice.id  
            )));
            setManagerReview(response.data.reviews.filter((review) => (
                review.reviewer.id === evaluationTodisplay.manager.id
            )));
            setReviewerReview(response.data.reviews.filter((review) => (
                review.reviewer.id !== evaluationTodisplay.manager.id && review.reviewer.id !== evaluationTodisplay.apprentice.id
            )));
        }
        )
    }, [evaluationID]);
    // }, [])
    // React.useEffect(() => {

    //     setApprenticeReview(evaluationTodisplay.reviews.filter((review) => (
    //         review.reviewer.id === evaluationTodisplay.apprentice.id  
    //     )));
    //     setManagerReview(evaluationTodisplay.reviews.filter((review) => (
    //         review.reviewer.id === evaluationTodisplay.manager.id
    //     )));
    //     setReviewerReview(evaluationTodisplay.reviews.filter((review) => (
    //         review.reviewer.id !== evaluationTodisplay.manager.id && review.reviewer.id !== evaluationTodisplay.apprentice.id
    //     )));
    // }, [evaluationTodisplay])




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
                    <Tabs orientation="vertical" selectedId={evaluationID} baseId="vertical-tabs-example" >
                        <TabList aria-label="Vertical product tabs">
                            <Tab id={evaluationID}>Apprentice</Tab>
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
                    <Tabs orientation="vertical" selectedId={evaluationID} baseId="vertical-tabs-example" >
                        <TabList aria-label="Vertical product tabs">
                            <Tab disabled>Apprentice</Tab>
                            <Tab disabled>Manager</Tab>
                            <Tab id={evaluationID}>Reviewer</Tab>
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
            {/* Apprentice View: */}
            {user.roleID === 2 &&
                <div id='singleEval'>
                    <Tabs orientation="vertical" selectedId={evaluationID} baseId="vertical-tabs-example" >
                        <TabList aria-label="Vertical product tabs">
                            <Tab id={evaluationID}>Apprentice</Tab>
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


