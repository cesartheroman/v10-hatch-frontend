import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const userID: number = 1;
  const baseURL: string = "http://localhost:3000/";
  const [evaluations, setEvaluations] = useState([
    {
      title: "PLACEHOLDER",
      creation: 10 - 22 - 2022,
      finalized: 10 - 23 - 2022,
      status: "PLACEHOLDER",
      questions: [],
      apprentice: { id: 420, name: "PLACEHOLDER" },
      manager: { id: 69, name: "PLACEHOLDER" },
      reviews: [
        { reviewId: 100, reviewer: "PLACEHOLDER 01" },
        { reviewId: 101, reviewer: "PLACEHOLDER 02" },
      ],
    },
  ]);

  useEffect(() => {
    axios.get(baseURL + "evaluations").then((response) => {
      setEvaluations(
        response.data.filter((object: any) => {
          return (
            object.apprentice.id === userID || object.manager.id === userID
          );
        })
      );
    });
  }, []);

  
  return (
    <div>
      {evaluations.map((evaluation) => (
        <div key={evaluation.title}>
          {" "}
          {evaluation.title} -{evaluation.creation} -{"Apprentice: "}{" "}
          {evaluation.apprentice.name} -{" Status:"} {evaluation.status} -
          {"Manager: "}
          {evaluation.manager.name} -{"Reviewers: "}
          {evaluation.reviews.map((review) => (
            <span key={review.reviewId}> {review.reviewer} </span>
          ))}{" "}
        </div>
      ))}
    </div>
  );
};
export default Dashboard;
