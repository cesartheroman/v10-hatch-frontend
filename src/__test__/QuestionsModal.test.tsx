/* @jest-environment jsdom
 */

import React, { useEffect } from "react";
import {
  findByTestId,
  render,
  RenderResult,
  screen,
  fireEvent,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { Theme } from "@twilio-paste/core/theme";
import QuestionsModal from "../QuestionsModal";

describe("check for button", () => {
  it("should render input element", async () => {
    render(
      <Theme.Provider>
        <QuestionsModal
          questionText={""}
          handleEditQuestion={function (question: any, id: number) {
            throw new Error("Function not implemented.");
          }}
          id={0}
        />
      </Theme.Provider>
    );
    const inputElement = screen.getByRole("button", {
      name: "Edit",
    });
    expect(inputElement).toBeInTheDocument();
  });
});
