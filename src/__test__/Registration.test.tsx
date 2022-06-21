/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, RenderResult, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Registration from "../Registration";
import { Theme } from "@twilio-paste/core/dist/theme";

// let documentBody: RenderResult;

describe("Should render Registration component", () => {
  test("renders Registration component", () => {
    render(<Registration />);
    expect(screen.getByText(/Register/)).toBeInTheDocument();
    expect(screen.getByText("Choose role")).toBeInTheDocument();

    // screen.debug();
  });
});
