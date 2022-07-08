/**
 * @jest-environment jsdom
 */

import React from "react";
import { act, render, RenderResult, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Dashboard from "../Dashboard";
import { Theme } from "@twilio-paste/core/dist/theme";

let documentBody: RenderResult;
let container: any;



  test("rendered Dashboard component has Evaluations", async () => {
    await act(async () => {render(<Theme.Provider theme="default"><Dashboard /></Theme.Provider>, container);});
    const results = await screen.findAllByLabelText(/Evaluations/)
    expect(!results).toBeFalsy();
  });

  test("rendered Dashboard component has Titles", async () => {
    await act(async () => {render(<Theme.Provider theme="default"><Dashboard /></Theme.Provider>, container);});
    expect(await screen.findByTestId("test-title")).toHaveTextContent("Evaluation Title");
  });


