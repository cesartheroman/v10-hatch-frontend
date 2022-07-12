/* @jest-environment jsdom
 */

import React from "react";
import {
  findByTestId,
  fireEvent,
  render,
  RenderResult,
  screen,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { Theme } from "@twilio-paste/core/theme";
import Questions from "../Questions";

it("should render correct headersß", async () => {
  render(
    <Theme.Provider>
      <Questions />
    </Theme.Provider>
  );
  const renderedQuestions = screen.getAllByRole("heading");
  expect(renderedQuestions.length).toBe(3);
});
