import * as React from "react";

import { Box } from "@twilio-paste/core/box";

type QASchema = { 
    question: string, 
    answer: string }


const QAView = (props: {qa:QASchema}) => {
  return (
    <>
        <p><span style={{fontWeight:700}}>Question: </span>{props.qa.question}</p>
        <p><span style={{fontWeight:700}}>Answer: </span>{props.qa.answer}</p>
    </>
  );
};

export default QAView;