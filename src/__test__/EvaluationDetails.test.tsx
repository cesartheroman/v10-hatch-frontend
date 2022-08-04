/**
 * @jest-environment jsdom
 */

 import * as React from "react";
 import { render, RenderResult, screen } from "@testing-library/react";
 import EvaluationDetails from '../EvaluationDetails'
  
  let documentBody: RenderResult;
  
  describe("EvaluationDetailsView", () => {
    test("renders EvaluationDetails component", () => {
      render(<EvaluationDetails />);
    });
  });