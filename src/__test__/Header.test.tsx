/**
 * @jest-environment jsdom
 */

 import * as React from "react";
 import { render, RenderResult, screen } from "@testing-library/react";
 import { MemoryRouter } from 'react-router-dom';
 import Header from '../Components/Header'
  
  let documentBody: RenderResult;
  
  describe("HeaderComponent", () => {
    test("renders Header component", () => {
      render(<Header />, {wrapper: MemoryRouter});
    });
  });
  
  test("renders header component", () => {
    render(<Header />, {wrapper: MemoryRouter});
    screen.debug();
  });
