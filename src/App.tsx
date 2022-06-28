import * as React from "react";
import Login from "./Login";
import Registration from "./Registration";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { Theme } from "@twilio-paste/core/theme";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router";
import CreateEvaluation from "./CreateEvaluation";
import NewReview from "./NewReview";
import Dashboard from "./Dashboard";

type EvaluationSchema = {
    title: string;
    creation: string;
    finalized: boolean;
    status: string;
    questions: string[];
    arprentice: {id: number,name: string},
    manager: {id: number, name: string},
    reviews: { reviewId: number, reviewer: string }[];
}

const App = () => {
  const evaluation = {

    title: "July - First Review",
    creation: "07/22/2022",
    finalized: "",
    status: "open",
    questions: [],
    arprentice: {
      id: 1,
      name: "Ruthie Clark"
    },
    manager: {
      id: 3,
      name: "Jiminy Cricket"
    },
    reviews: [
      {
        reviewId: 501,
        reviewer: "Gregg G. Greggory"
      },
      {
        reviewId: 33,
        reviewer: "Ruthie Clark"
      },
      {
        reviewId: 44,
        reviewer: "Jiminy Cricket"
      }
    ]

  }
  return (
    <Theme.Provider theme="default">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/CreateEvaluation" element={<CreateEvaluation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/newreview" element={<NewReview evaluation={evaluation} />} />

        </Routes>
      </Router>
      <Footer />
    </Theme.Provider>
  );
};

export default App;
