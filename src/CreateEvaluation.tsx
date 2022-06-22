import * as React from "react";
import { useState } from "react";
import { Input, Box, Label, Button } from "@twilio-paste/core";
import axios from "axios";

// TODO: Role check logic
// TODO: Update Nav Bar

const CreateEvaluation = () => {
  // TODO: GET apprentice assigned api/v1/users/managers/id/apprentices
  // TODO: GET all questions /api/v1/questions/
  // TODO: GET all reviewers /api/v1/users/reviewers
  // TODO: POST eval api/v1/evalutations
  //       on post have confirm modal or redirect

  return (
    <Box margin="space100" padding="space100" borderStyle="solid">
      <h2>Hello from Create Evalutation</h2>
      {/* TODO: TITLE*/}
      {/* TODO: Select Apprentice */}
      {/* TODO: Question Selection */}
      {/* TODO: Select Reviewers */}
      {/* TODO: Submit button*/}
    </Box>
  );
};

export default CreateEvaluation;
