/* @jest-environment jsdom
*/

import React from "react";
import { findByTestId, render, RenderResult, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import NewReview from "../NewReview";
import { Theme } from "@twilio-paste/core/dist/theme";


function renderNewReviewFrom() {
    return render(<NewReview  />)
}

describe("<NewReview/>", () => {
    test("should display a blank new review form",async () => {
        const { findByTestId } = renderNewReviewFrom();

        const newReviewForm = await findByTestId('newreview-form');

        expect(newReviewForm).toHaveFormValues({
            answer1:"",
            answer2:"",
            answer3:""
        })
    })
})

/**
 * @jest-environment jsdom
 */


  
  let documentBody: RenderResult;
  
//   describe("SingleEvaluationView", () => {
//     test("renders SingleEvaluationView component", () => {
//       render(<NewReview />);
//     });
//   });