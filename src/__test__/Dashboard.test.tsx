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

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});


  test("rendered Dashboard component has Evaluations", async () => {
    act(() => {render(<Theme.Provider theme="default"><Dashboard /></Theme.Provider>);});
    const results = await screen.findAllByLabelText(/Evaluations/)
    expect(results).toBeInTheDocument()
  });

  test("rendered Dashboard component has Titles", async () => {
    act(() => {render(<Theme.Provider theme="default"><Dashboard /></Theme.Provider>);});
    const results = await screen.findAllByLabelText(/Title of Eval/)
   
    expect(results).toBeInTheDocument()
  });


