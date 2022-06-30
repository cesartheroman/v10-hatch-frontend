import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Heading, Anchor, Input, Label } from "@twilio-paste/core";
import { Box } from "@twilio-paste/core/box";
import { FileIcon } from "@twilio-paste/icons/esm/FileIcon";
import {
  DataGrid,
  DataGridHead,
  DataGridHeaderSortProps,
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
import "array-sort";
import { reverse } from "cypress/types/lodash";





/**
 * This is the component 
 * @date 6/30/2022 - 2:33:43 PM
 *
 * @returns {*}
 */
const Dashboard = () => {
  const currentUser = {
    id: 2,
    name: "Jiminy Cricket",
    role: 3
  }
  const baseURL: string = "http://localhost:3000/";
  const [isDesc, setIsDesc] = useState(true);
  const [filter, setFilter] = useState("");
  const [savedEvaluations, setSavedEvaluations] = useState([
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
        { reviewId: 100, reviewer: {id: 69, name: "PLACEHOLDER 01" }},
        { reviewId: 101, reviewer: {id: 692, name: "PLACEHOLDER 02" }},
      ],
    },
  ]);
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
        { reviewId: 100, reviewer: {id: 69, name: "PLACEHOLDER 01" }},
        { reviewId: 101, reviewer: {id: 692, name: "PLACEHOLDER 02" }},
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
            object.apprentice.id === currentUser.id || object.manager.id === currentUser.id ||
            (object.reviews.some((rev: any) => rev.reviewer.id === currentUser.id))
          );
        })
      );
      setSavedEvaluations(
        response.data.filter((object: any) => {
          return (
            object.apprentice.id === currentUser.id || object.manager.id === currentUser.id || (object.reviews.some((rev: any) => rev.reviewer.id === currentUser.id))
          );
        })
      );
    });
  }, []);

  const arraySort = require("array-sort");

  function FilterEvaluations(param: string): void {
    let sortMePlease = [...evaluations];
    setIsDesc(!isDesc);
    let sortedEvals = arraySort(sortMePlease, param, { reverse: isDesc });
    setEvaluations(sortedEvals);
    console.log(evaluations);
  }

  function FilterNames(param: string): void {
    if (param.length >= 1) {
      let filteredEvals: any = savedEvaluations.filter(
        (eva) =>
          eva.apprentice.name.includes(param) ||
          eva.manager.name.includes(param)
      );
      setEvaluations(filteredEvals);
    } else {
      setEvaluations(savedEvaluations);
    }
  }

  function FilterReviewerNames(param: string): void {
    if (param.length >= 1) {
      let filteredEvals: any = savedEvaluations.filter((eva) =>
        eva.reviews.some((review) => review.reviewer.name.includes(param))
      );
      setEvaluations(filteredEvals);
    } else {
      setEvaluations(savedEvaluations);
    }
  }

  function Status(evaluation: any) {
    if (evaluation.status === "open") {
      return <Box id="openBox">Open</Box>;
    } else if (evaluation.status === "in progress") {
      return <Box id="inProgressBox">In Progress</Box>;
    } else {
      return <Box id="completedBox">Completed</Box>;
    }
  }

  return (
    <div id="dashboard">
      <div id="filterContainer">
        <Box>
          <Label htmlFor="filter">Filter by Apprentice/Manager: </Label>
          <Input
            id="filter"
            name="filter"
            type="text"
            onChange={(e) => FilterNames(e.target.value)}
          />
          <br />
          <Label htmlFor="filter">Filter by Reviewer: </Label>
          <Input
            id="filterReviewer"
            name="filterReviewer"
            type="text"
            onChange={(e) => FilterReviewerNames(e.target.value)}
          />
        </Box>
      </div>
      <DataGrid aria-label="Evaluations list" data-testid="data-grid" striped>
        <DataGridHead>
          <DataGridRow>
            <DataGridHeader width="200px">
              Evaluation Title{" "}
              <DataGridHeaderSort
                direction="none"
                //TODO: write function that changes direction of arrow depending on status above
                onClick={() => FilterEvaluations("id")}
              />
            </DataGridHeader>
            <DataGridHeader width="150px">
              Date Initialized{" "}
              <DataGridHeaderSort
                direction="none"
                //TODO: write function that changes direction of arrow depending on status above
                onClick={() => FilterEvaluations("creation")}
              />
            </DataGridHeader>
            <DataGridHeader width="150px">
              Apprentice{" "}
              <DataGridHeaderSort
                direction="none"
                //TODO: write function that changes direction of arrow depending on status above
                onClick={() => FilterEvaluations("apprentice.name")}
              />
            </DataGridHeader>
            <DataGridHeader width="150px">
              Manager{" "}
              <DataGridHeaderSort
                direction="none"
                //TODO: write function that changes direction of arrow depending on status above
                onClick={() => FilterEvaluations("manager.name")}
              />
            </DataGridHeader>
            <DataGridHeader width="200px">Reviewers</DataGridHeader>
            <DataGridHeader width="100px">
              Status{" "}
              <DataGridHeaderSort
                direction="none"
                //TODO: write function that changes direction of arrow depending on status above
                onClick={() => FilterEvaluations("status")}
              />
            </DataGridHeader>
            <DataGridHeader width="180px">Details</DataGridHeader>
          </DataGridRow>
        </DataGridHead>
        <DataGridBody>
          {evaluations.map((evaluation) => (
            <DataGridRow key={evaluation.id}>
              <DataGridCell>
                <Heading as="h2" aria-label="Title of Eval" variant="heading50">
                  {evaluation.title}
                </Heading>
              </DataGridCell>
              <DataGridCell>
                <i>{evaluation.creation}</i>
              </DataGridCell>
              <DataGridCell>{evaluation.apprentice.name}</DataGridCell>
              <DataGridCell>{evaluation.manager.name}</DataGridCell>
              <DataGridCell>
                <ul className="list">
                  {evaluation.reviews.map((review) => (
                    <li className="listItems" key={review.reviewer.id}>
                      {review.reviewer.name}
                    </li>
                  ))}
                </ul>
              </DataGridCell>
              <DataGridCell>{Status(evaluation)}</DataGridCell>
              <DataGridCell>
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
