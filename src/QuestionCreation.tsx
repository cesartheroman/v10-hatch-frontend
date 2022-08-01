import * as React from "react";
import { useState } from "react";
import {
  Label,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalFooterActions,
  ModalHeading,
  HelpText,
  TextArea,
  Box,
} from "@twilio-paste/core";
import { useUID } from "react-uid";

interface QuestionCreationProps {
  handlePostQuestion: (question: string) => any;
}

const QuestionCreation = (props: QuestionCreationProps) => {
  const [questionText, setQuestionText] = useState<any>("");
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const modalHeadingID = useUID();
  const [isOpen, setIsOpen] = useState(false);

  /**
   * multiOnclick - multiple function calls for posting a new question
   * props.handlePostQuestion takes in the user's input and makes a post to the DB
   * after the call is made handleClose closes the modal
   *
   * @param {*} questionText
   */
  const postThenClose = (questionText: any) => {
    props.handlePostQuestion(questionText);
    handleClose();
  };

  return (
    <Box>
      <Button variant="secondary" onClick={handleOpen}>
        Create New Question
      </Button>
      <Modal
        ariaLabelledby={modalHeadingID}
        isOpen={isOpen}
        onDismiss={handleClose}
        size="default"
      >
        <ModalHeader>
          <ModalHeading as="h3" id={modalHeadingID}>
            Create Question
          </ModalHeading>
        </ModalHeader>
        <ModalBody>
          <Label htmlFor="message" required>
            Enter new question
          </Label>
          <TextArea
            onChange={(e) => {
              setQuestionText(e.target.value);
            }}
            aria-describedby="message_help_text"
            id="message"
            name="message"
            placeholder="Enter question here"
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
              onClick={() => postThenClose(questionText)}
              variant="primary"
            >
              Done
            </Button>
          </ModalFooterActions>
        </ModalFooter>
      </Modal>
    </Box>
  );
};

export default QuestionCreation;
