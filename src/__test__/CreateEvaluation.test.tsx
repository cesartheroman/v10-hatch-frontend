/**
 * @jest-environment jsdom
 */

import React from "react";
import { act, render, RenderResult, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import CreateEvaluation from "../CreateEvaluation";
import { Theme } from "@twilio-paste/core/dist/theme";

describe("App component", () => {
  test("it renders", () => {
    render(<CreateEvaluation />);
  });
});
