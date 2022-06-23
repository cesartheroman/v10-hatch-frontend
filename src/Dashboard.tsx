import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const userID: number = 5;
  const baseURL: string = "http://localhost:3000/";
  const [evaluations, setEvaluations] = useState([
    {
      title: "PLACEHOLDER",
      creation: 10 - 22 - 2022,
      finalized: 10 - 23 - 2022,
      status: "PLACEHOLDER",
      questions: [],
      apprenticeID: 1,
      managerID: 1,
      reviews: [1, 2, 3],
    },
  ]);

  useEffect(() => {
    axios.get(baseURL + "evaluations").then((response) => {
      setEvaluations(
        response.data.filter((object: any) => {
          return object.apprenticeID === userID || object.managerID === userID;
        })
      );
    });
  }, []);

  // function getName(id:number) {
  //   axios.get(baseURL + "users/" + id).then((response) => {
  //     console.log(response.data.name)
  //      return response.data.name ;
       
  //   })}

  
  //TODO: realign object in mock db to match that of the new backend object framework,
  //       to grab the name for displaying. 

  return (
    <div>
        {evaluations.map((evaluation) => (
          <p key={evaluation.title}>
            {" "}
            {evaluation.title} - {getName(evaluation.apprenticeID)} - {evaluation.status}{" "}
            - {getName(evaluation.managerID)}{" "}
          </p>
        ))}
      </div>
  )
        };
export default Dashboard;
