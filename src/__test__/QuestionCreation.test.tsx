/* @jest-environment jsdom
 */

import React, { useEffect } from "react";
import {
  findByTestId,
  render,
  RenderResult,
  screen,
  fireEvent,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { Theme } from "@twilio-paste/core/theme";
import QuestionCreation from "../QuestionCreation";

describe("check for button", () => {
  it("should render input element", async () => {
    render(
      <Theme.Provider>
        <QuestionCreation
          handlePostQuestion={function (question: string) {
            throw new Error("Function not implemented.");
          }}
        />
      </Theme.Provider>
    );
    const inputElement = screen.getByRole("button", {
      name: "Create New Question",
    });
    expect(inputElement).toBeInTheDocument();
  });
});
