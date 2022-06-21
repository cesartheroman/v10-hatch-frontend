/**
 * @jest-environment jsdom
 */

import * as React from "react";
import { render, RenderResult, screen } from "@testing-library/react";
import Login from '../Login'
 
 let documentBody: RenderResult;
 
 describe("LoginComponent", () => {
   test("renders Login component", () => {
     render(<Login />);
   });
 });
 
 test("renders learn react link", () => {
   render(<Login />);
   screen.debug();
 });
 