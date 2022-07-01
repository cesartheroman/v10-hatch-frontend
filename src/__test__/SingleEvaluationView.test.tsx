/**
 * @jest-environment jsdom
 */

 import * as React from "react";
 import { render, RenderResult, screen } from "@testing-library/react";
 import SingleEvaluationView from '../SingleEvaluationView'
  
  let documentBody: RenderResult;
  
  describe("SingleEvaluationView", () => {
    test("renders SingleEvaluationView component", () => {
      render(<SingleEvaluationView />);
    });
  });