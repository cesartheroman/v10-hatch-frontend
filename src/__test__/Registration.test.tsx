/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, RenderResult, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Registration from "../Registration";

// let documentBody: RenderResult;

describe("Should render Registration component", () => {
  test("renders Registration component", () => {
    render(<Registration />);
    expect(screen.getByText(/Register/)).toBeInTheDocument();
    expect(screen.getByText("Choose role")).toBeInTheDocument();

    // screen.debug();
  });
});
