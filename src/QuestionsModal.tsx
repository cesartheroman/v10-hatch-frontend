import * as React from "react";
import { useState, useEffect } from "react";
import {
  Label,
  Button,
  Modal,
  ModalHeader,
  Paragraph,
  ModalBody,
  ModalFooter,
  ModalFooterActions,
  ModalHeading,
  HelpText,
  TextArea,
} from "@twilio-paste/core";
import { useUID } from "react-uid";

interface singleQuestion {
  questionText: string;
  handleEditQuestion: (question: any, id: number) => any;
  id: number;
}

const QuestionsModal = (props: singleQuestion) => {
  const [questionText, setQuestionText] = useState<any>("");
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const [isOpen, setIsOpen] = useState(false);
  const modalHeadingID = useUID();
  return (
    <div>
      <Button variant="link" onClick={handleOpen}>
        Edit
      </Button>
      <Modal
        ariaLabelledby={modalHeadingID}
        isOpen={isOpen}
        onDismiss={handleClose}
        size="default"
      >
        <ModalHeader>
          <ModalHeading as="h3" id={modalHeadingID}>
            Edit Question
          </ModalHeading>
        </ModalHeader>
        <ModalBody>
          <Paragraph>{props.questionText}</Paragraph>

          <Label htmlFor="message" required>
            Enter new question text
          </Label>
          <TextArea
            onChange={(e) => {
              setQuestionText(e.target.value);
            }}
            aria-describedby="message_help_text"
            id="message"
            name="message"
            defaultValue={props.questionText}
            required
          />
          <HelpText id="message_help_text">Click done to submit</HelpText>
        </ModalBody>
        <ModalFooter>
          <ModalFooterActions>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              onClick={() => props.handleEditQuestion(questionText, props.id)}
              variant="primary"
            >
              Done
            </Button>
          </ModalFooterActions>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default QuestionsModal;
