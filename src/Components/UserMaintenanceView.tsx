import * as React from "react";
import axios, { AxiosRequestConfig } from "axios";
import "../styles.css";
import { useEffect, useState } from "react";
import { Button } from "@twilio-paste/core/button";
import { Heading } from "@twilio-paste/core";
import { Box } from "@twilio-paste/core";
import {
  DataGrid,
  DataGridHead,
  DataGridRow,
  DataGridHeader,
  DataGridBody,
  DataGridCell,
} from "@twilio-paste/core/data-grid";

const UserMaintainance = () => {
  const BASE_URL: string = "http://localhost:3000";
  const HEADER_DATA: string[] = [
    "Name",
    "Role",
    "Email",
    "Manage role/relations",
  ];
  const USER_ROLES: string[] = [
    "Apprentice",
    "Reviewer",
    "Manager",
    "Hatch Manager",
  ];
  const [users, setUsers] = useState<User[]>([]);

  interface User {
    id: number;
    email: string;
    name: string;
    roleID: number;
  }

  const getUsers = async () => {
    const config: AxiosRequestConfig<any> = {
      method: "GET",
      url: BASE_URL + "/users",
      headers: {},
    };

    try {
      const responseData = await axios(config);
      const { data: userData } = responseData;
      setUsers(userData);
    } catch (err) {
      console.error(err);
    }
  };

  const assignApprenticeToEngMgr = async () => {
    //TODO: make logic to assign an Apprentice to and EngMgr
  };

  const convertToEngMgr = async () => {
    //TODO: write logic to convert role to EngMgr
  };

  const handleClick = (user: User) => {
    const userRole = USER_ROLES[user.roleID - 1];
    if (userRole === "Manager" || userRole === "Hatch Manager") {
      console.log("manager!");
    }
    // console.log(user);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Box margin="space100">
      <Heading as="h1" variant="heading10" id="userHeading">
        All Users
      </Heading>
      <DataGrid aria-label="User Maintainance" striped>
        <DataGridHead>
          <DataGridRow>
            {HEADER_DATA.map((header, idx) => (
              <DataGridHeader key={idx}>{header}</DataGridHeader>
            ))}
          </DataGridRow>
        </DataGridHead>
        <DataGridBody>
          {users.map((user: User) => {
            return (
              <DataGridRow key={user.id}>
                <DataGridCell>{user.name}</DataGridCell>
                <DataGridCell>{USER_ROLES[user.roleID - 1]}</DataGridCell>
                <DataGridCell>{user.email}</DataGridCell>
                <DataGridCell>
                  <Button variant="secondary" onClick={() => handleClick(user)}>
                    Edit
                  </Button>
                </DataGridCell>
              </DataGridRow>
            );
          })}
        </DataGridBody>
      </DataGrid>
    </Box>
  );
};

export default UserMaintainance;
