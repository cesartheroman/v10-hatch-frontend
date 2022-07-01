/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, RenderResult, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import CreateEvaluation from "../CreateEvaluation";

// let documentBody: RenderResult;

describe("Should render Registration component", () => {
  test("renders Registration component", () => {
    render(<CreateEvaluation />);
    // expect(screen.getByText(/New/)).toBeInTheDocument();
    //  expect(screen.getByText("Choose role")).toBeInTheDocument();

    // screen.debug();
  });
});
