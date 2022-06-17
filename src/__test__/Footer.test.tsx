/**
 * @jest-environment jsdom
 */

import * as React from "react";
import { render } from "@testing-library/react";
import Footer from "../Components/Footer";

describe("Footer", () => {
  test("renders Footer", () => {
    render(<Footer />);
  });
});
