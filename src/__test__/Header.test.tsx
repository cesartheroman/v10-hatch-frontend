/**
 * @jest-environment jsdom
 */

import * as React from "react";
import { render } from "@testing-library/react";
import Header from "../Components/Header";

describe("Header", () => {
  test("renders Header", () => {
    render(<Header />);
  });
});
