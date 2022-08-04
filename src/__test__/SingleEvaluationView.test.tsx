/**
 * @jest-environment jsdom
 */

 import * as React from "react";
 import { render, RenderResult, screen } from "@testing-library/react";
 import EvaluationDetails from '../EvaluationDetails'
  
  let documentBody: RenderResult;
  
  describe("SingleEvaluationView", () => {
    test("renders SingleEvaluationView component", () => {
      render(<EvaluationDetails />);
    });
  });