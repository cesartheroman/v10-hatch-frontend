import * as React from "react";
import Login from "./Login";
import Registration from "./Registration";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { Theme } from "@twilio-paste/core/theme";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes} from "react-router";
import CreateEvaluation from "./CreateEvaluation";
import NewReview from "./NewReview";
import Dashboard from "./Dashboard";
import Questions from "./Questions";
import UserMaintenanceView from "./Components/UserMaintenanceView";
import EvaluationDetails from "./EvaluationDetails";


const App = () => {
  
  return (
    <Theme.Provider theme="default">
      <div id="content-wrap">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/CreateEvaluation" element={<CreateEvaluation />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/evaluation/:evalId/reviews/:reviewId" element={<NewReview />} />
            <Route path="/evaluation/:id" element={<EvaluationDetails />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/UserMaintenance" element={<UserMaintenanceView />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </Theme.Provider>
  );
};

export default App;
