/**
 * @jest-environment jsdom
 */

 import * as React from "react";
 import { render, RenderResult, screen } from "@testing-library/react";
 import { MemoryRouter } from 'react-router-dom';
 import Dashboard from '../Dashboard';
  
  let documentBody: RenderResult;
  
  describe("Rendering Dashboard", () => {
    test("renders Header component", () => {
      render(<Dashboard />, {wrapper: MemoryRouter});
    });
  });
  
//TODO: working on jest testing lol


//   test("retrieves an object", () => {
//     render(<Dashboard />, {wrapper: MemoryRouter});
//     expect(React.useState.evaluations)
//   });
//   test("renders header component", () => {
//     render(<Header />, {wrapper: MemoryRouter});
//     screen.debug();
//   });
