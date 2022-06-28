/* @jest-environment jsdom
*/

import React from "react";
import { findByTestId, render, RenderResult, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import NewReview from "../NewReview";
import { Theme } from "@twilio-paste/core/dist/theme";


function renderNewReviewFrom() {
    return render(<NewReview evaluation={{
        title: "",
        creation: "",
        finalized: "",
        status: "",
        questions: [],
        arprentice: {
            id: 0,
            name: ""
        },
        manager: {
            id: 0,
            name: ""
        },
        reviews: []
    }} />)
}

describe("<NewReview/>", () => {
    test("should display a blank login form",async () => {
        const { findByTestId } = renderNewReviewFrom();

        const newReviewForm = await findByTestId('newreview-form');

        expect(newReviewForm).toHaveFormValues({
            answer1:"",
            answer2:"",
            answer3:""
        })
    })
})