import * as React from "react";
import {
  DataGrid,
  DataGridHead,
  DataGridRow,
  DataGridHeader,
  DataGridBody,
  DataGridCell,
  Heading,
  Button,
} from "@twilio-paste/core";
import QuestionsModal from "./QuestionsModal";

interface QuestionProps {
  questions: any;
  handleEditQuestion: (question: any, id: number) => any;
  handleDeleteQuestion: (id: number) => any;
}

const QuestionsDataGrid = (props: QuestionProps) => {
  return (
    <DataGrid aria-label="User information table" striped>
      <DataGridHead>
        <DataGridRow>
          <DataGridHeader></DataGridHeader>
          <DataGridHeader>Question Content</DataGridHeader>
          <DataGridHeader></DataGridHeader>
          <DataGridHeader></DataGridHeader>
        </DataGridRow>
      </DataGridHead>
      <DataGridBody>
        {props.questions.map((question: any) => (
          <DataGridRow key={question.id}>
            <DataGridCell>
              <Heading as="h2" aria-label="Id" variant="heading50"></Heading>
            </DataGridCell>
            <DataGridCell>
              <Heading as="h2" aria-label="Questions" variant="heading50">
                {question.question}
              </Heading>
            </DataGridCell>
            <DataGridCell>
              <Heading as="h2" aria-label="Edit" variant="heading50">
                <QuestionsModal
                  handleEditQuestion={props.handleEditQuestion}
                  questionText={question.question}
                  id={question.id}
                />
              </Heading>
            </DataGridCell>
            <DataGridCell>
              <Button
                onClick={() => props.handleDeleteQuestion(question.id)}
                variant="destructive_link"
              >
                Delete
              </Button>
            </DataGridCell>
          </DataGridRow>
        ))}
      </DataGridBody>
    </DataGrid>
  );
};

export default QuestionsDataGrid;
