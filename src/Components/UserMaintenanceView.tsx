import * as React from "react";
import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";
import UserMaintenance from "./UserMaintenance";
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
import "../styles.css";

export interface User {
  id: number;
  email: string;
  name: string;
  roleID: number;
}

const UserMaintainanceView = () => {
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
                  <UserMaintenance userToEdit={user} userRoles={USER_ROLES} />
                </DataGridCell>
              </DataGridRow>
            );
          })}
        </DataGridBody>
      </DataGrid>
    </Box>
  );
};

export default UserMaintainanceView;
