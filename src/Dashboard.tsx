import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const baseURL: string = "http://localhost:3000/evaluations";
  const [evaluations, setEvaluations] = useState([
    {
      title: "PLACEHOLDER",
      creation: 10 - 22 - 2022,
      finalized: 10 - 23 - 2022,
      status: "PLACEHOLDER",
      questions: [],
      apprenticeID: 0,
      managerID: 0,
      reviews: [1, 2, 3],
    },
  ]);

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setEvaluations(response.data);
    });
  }, []);

  return (
    <div>
      <h1>DASHBOARD</h1>
      <div>
        {evaluations.map((evaluation) => (
          <p key={evaluation.title}>
            {" "}
            {evaluation.title} - {evaluation.apprenticeID} - {evaluation.status} - {evaluation.managerID} {" "}
          </p>
        ))}
      </div>
    </div>
  );
};
export default Dashboard;
