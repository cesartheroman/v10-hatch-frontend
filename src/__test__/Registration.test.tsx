/**
 * @jest-environment jsdom
 */

import * as React from "react";
import { render, RenderResult, screen } from "@testing-library/react";
import Registration from "../Registration";

let documentBody: RenderResult;

describe("Registration", () => {
  test("renders Reg component", () => {
    render(<Registration />);
  });
});

test("renders learn react link", () => {
  render(<Registration />);
  screen.debug();
});
