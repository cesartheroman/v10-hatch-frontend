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
 *
 * This is the All Evaluations view, known as the Dashboard - since it is the main view all users see upon logging in.
 * The content displayed in the dashboard table differs depending on the individual's userID, which is stored
 * after logging in. The filtering Box on the left allows for string filtering Evaluations by name of Apprentice/Manager
 * or by name of individual Reviewers.
 *
 */

const Dashboard = () => {
  /**
   *  CONSTANTS
   *
   * baseURL = the url of the API server that will be connected to via our Axios GET command.
   * isDesc = a boolean toggle for the sorting.
   * filter = string const, used for string filtering.
   *
   * evaluations = current array of data pulled from the API. filtered initially in the useEffect call,
   *                changed actively w/ user-led filtering/sorting, and is displayed to user.
   * savedEvaluations = a "backup" copy of the evaluations data. initially filtered like evaluations is in the useEffect call,
   *                  but is never accessed directly - only used to reset the evaluations array after filtering.
   * headerData= array of header titles for the dashboard DataGrid.
   * arraySort = allows for us to sort data. Yay.
   *
   * (The currentUser constant is a temporary measure and will be deleted once we have full user Authorization parameters
   * to play with. )
   */

  const currentUser = {
    id: 2,
    name: "Jiminy Cricket",
    role: 3,
  };
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
        { reviewId: 100, reviewer: { id: 69, name: "PLACEHOLDER 01" } },
        { reviewId: 101, reviewer: { id: 692, name: "PLACEHOLDER 02" } },
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
        { reviewId: 100, reviewer: { id: 69, name: "PLACEHOLDER 01" } },
        { reviewId: 101, reviewer: { id: 692, name: "PLACEHOLDER 02" } },
      ],
    },
  ]);
  const arraySort = require("array-sort");

  const HeaderData: any = [
    "Title",
    "Date Submitted",
    "Apprentice",
    "Manager",
    "Reviewers",
  ];

  /**
   * LOAD FUNCTIONS
   *
   * useEffect calls the axios GET command at the /evaluations endpoint on page loading.
   *
   * */

  useEffect(() => {
    axios.get(baseURL + "evaluations").then((response) => {
      setEvaluations(
        response.data.filter((object: any) => {
          return (
            object.apprentice.id === currentUser.id ||
            object.manager.id === currentUser.id ||
            object.reviews.some(
              (rev: any) => rev.reviewer.id === currentUser.id
            )
          );
        })
      );
      setSavedEvaluations(
        response.data.filter((object: any) => {
          return (
            object.apprentice.id === currentUser.id ||
            object.manager.id === currentUser.id ||
            object.reviews.some(
              (rev: any) => rev.reviewer.id === currentUser.id
            )
          );
        })
      );
    });
  }, []);

  /**
   * FILTERING FUNCTIONS
   *
   * FilterEvaluations() - sorts data in columns in ascending/descending fashion, according to the toggle clicked.
   *  @param param - string that matches the column's data type to be filtered, ie "id" or "date created".
   *
   * FilterNames() - filters all visible data according to the string inputed in the filtering box. This function is
   * specific to the Apprentices and Managers, due to the hassle of filtering the nested Reviewer names.
   *   @param str - string that is searched for using the 'includes' function. searches for anywhere in the string.
   *
   * FilterReviewerNames() - same as above, but specific to the Reviewers.
   *
   * All these functions return void - they just set the evaluations to what is sorted.
   */

  function FilterEvaluations(param: string): void {
    let sortMePlease = [...evaluations];
    setIsDesc(!isDesc);
    let sortedEvals = arraySort(sortMePlease, param, { reverse: isDesc });
    setEvaluations(sortedEvals);
  }

  function FilterNames(str: string): void {
    if (str.length >= 1) {
      let filteredEvals: any = savedEvaluations.filter(
        (eva) =>
          eva.apprentice.name.includes(str) || eva.manager.name.includes(str)
      );
      setEvaluations(filteredEvals);
    } else {
      setEvaluations(savedEvaluations);
    }
  }

  function FilterReviewerNames(str: string): void {
    if (str.length >= 1) {
      let filteredEvals: any = savedEvaluations.filter((eva) =>
        eva.reviews.some((review) => review.reviewer.name.includes(str))
      );
      setEvaluations(filteredEvals);
    } else {
      setEvaluations(savedEvaluations);
    }
  }

  /**
   * Status function - displays a box w/ a differing color & text depending on the status of that eval.
   * @param evaluation = any one evaluation
   * @returns Box w/ text showing status of evaluation.
   *
   */

  function Status(evaluation: any) {
    if (evaluation.status === "open") {
      return <Box id="openBox">Open</Box>;
    } else if (evaluation.status === "in progress") {
      return <Box id="inProgressBox">In Progress</Box>;
    } else {
      return <Box id="completedBox">Completed</Box>;
    }
  }

  function DisplayRole(roleID: number): string{
    if (roleID === 1) {
      return "Apprentice"
    } else if (roleID ===2){
      return "Reviewer"
    } else if (roleID === 3){
      return "Manager"
    } else {
      return "New God"
    }
  }

  return (
   
    <div id="dashboard">
      <div id="filterContainer">
        <Box id="greetingBox">
          Ahoy, <b>{currentUser.name}</b>!
          <br /> <br />
          Your id number is: <b>{currentUser.id}</b>
          <br /> and your role is: <b>{DisplayRole(currentUser.role)}</b>.
          <br /> 
        </Box>
        <Box>
          <Label htmlFor="filterAppMan">Filter by Apprentice/Manager: </Label>
          <Input
            id="filterAppMan"
            name="filterAppMan"
            type="text"
            onChange={(e) => FilterNames(e.target.value)}
          />
          <br />
          <Label htmlFor="filterReviewer">Filter by Reviewer: </Label>
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
