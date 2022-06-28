import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Heading, Anchor } from "@twilio-paste/core";
import { Box } from "@twilio-paste/core/box";
import { FileIcon } from "@twilio-paste/icons/esm/FileIcon";
import {
  DataGrid,
  DataGridHead,
  DataGridRow,
  DataGridHeader,
  DataGridHeaderSort,
  DataGridBody,
  DataGridCell,
  DataGridFoot,
} from "@twilio-paste/core/data-grid";
import type { SortDirection } from "@twilio-paste/core/data-grid";
import "./styles.css";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const userID: number = 2;
  const baseURL: string = "http://localhost:3000/";
  const [evaluations, setEvaluations] = useState([
    {
      id: 69,
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

  const HeaderData: any = [
    "Title",
    "Date Submitted",
    "Apprentice",
    "Manager",
    "Reviewers",
  ];

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

  function Status(evaluation : any) {
    if (evaluation.status === "open") {
      return <Box id="openBox">Open</Box>
    } else if (evaluation.status === "in progress") {
      return <Box id="inProgressBox">In Progress</Box>
    } else { 
      return <Box id="completedBox">Completed</Box>
    }
  };
  

  return (
    <div id="dashboard">
      <div id="filter">
        <Box>
          <Heading as="h1" variant="heading50">
            {" "}
            Filters{" "}
          </Heading>
          <p> Sort by: </p>
          <p> Uh some stuff here ????</p>
        </Box>
      </div>
      <DataGrid aria-label="Evaluations list" data-testid="data-grid" striped>
        <DataGridHead>
          <DataGridRow>
            <DataGridHeader width="200px">Evaluation Title</DataGridHeader>
            <DataGridHeader width="150px">Date Initialized</DataGridHeader>
            <DataGridHeader width="150px">Apprentice</DataGridHeader>
            <DataGridHeader width="150px">Manager</DataGridHeader>
            <DataGridHeader width="200px">Reviewers</DataGridHeader>
            <DataGridHeader width="100px">Status</DataGridHeader>
            <DataGridHeader width="180px">Details</DataGridHeader>
          </DataGridRow>
        </DataGridHead>
        <DataGridBody>
          {evaluations.map((evaluation) => (
            <DataGridRow key={evaluation.title}>
              <DataGridCell>
                <Heading as="h2" variant="heading50">
                  {evaluation.title}
                </Heading>
              </DataGridCell>
              <DataGridCell><i>{evaluation.creation}</i></DataGridCell>
              <DataGridCell>{evaluation.apprentice.name}</DataGridCell>
              <DataGridCell>{evaluation.manager.name}</DataGridCell>
              <DataGridCell>
                <ul className="list">
                  {evaluation.reviews.map((review) => (
                    <li className="listItems" key={review.reviewId}>
                      {review.reviewer}
                    </li>
                  ))}
                </ul>
              </DataGridCell>
              <DataGridCell>
                {Status(evaluation)} 
              </DataGridCell>
              <DataGridCell>
                {/* //TODO:  - attach linking function to correct evaluation individual view once completed. */}

                <Anchor
                  href="#"
                  id="detailsLink"
                  onClick={() => {
                    console.log("Linking to /evaluations/" + evaluation.id);
                  }}
                >
                  <span id="viewDetails">View Details</span>
                  <FileIcon
                    decorative={true}
                    title="Link to Details of Evaluation"
                  />
                </Anchor>
              </DataGridCell>
            </DataGridRow>
          ))}
        </DataGridBody>
      </DataGrid>
    </div>
  );
};
export default Dashboard;
