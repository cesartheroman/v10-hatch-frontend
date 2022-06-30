import * as React from "react";

import { Box } from "@twilio-paste/core/box";

type QASchema = { 
    question: string, 
    answer: string }


const QAView = (props: {qa:QASchema}) => {
  return (
    <>
        <p>{props.qa.question}</p>
        <p>{props.qa.answer}</p>
    </>
  );
};

export default QAView;