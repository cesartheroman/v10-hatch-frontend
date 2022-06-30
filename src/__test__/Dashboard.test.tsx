/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, RenderResult, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Dashboard from "../Dashboard";
import { Theme } from "@twilio-paste/core/dist/theme";

// let documentBody: RenderResult;

describe("Should render Dashboard component", () => {
  test("renders Dashboard component, has Evaluations", () => {
    render(<Theme.Provider theme="default"><Dashboard /></Theme.Provider>);
    const evals= expect(screen.getByLabelText(/Evaluations/))
    // screen.debug();
  });
});
