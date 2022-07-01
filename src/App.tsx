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
import SingleEvaluationView from "./SingleEvaluationView";

const App = () => {
  
  return (
    <Theme.Provider theme="default">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/CreateEvaluation" element={<CreateEvaluation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/newreview" element={<NewReview />} />
          <Route path="/evaluation" element={<SingleEvaluationView/>}/>
        </Routes>
      </Router>
      <Footer />
    </Theme.Provider>
  );
};

export default App;
