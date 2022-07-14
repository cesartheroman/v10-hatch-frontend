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
  name: string;
  email: string;
  manager: string;
  roleID: number;
}

const UserMaintainanceView = () => {
  const BASE_URL: string = "http://localhost:9876/v1/api";
  const authToken: string =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI5IiwidXNlcklEIjoiOSIsIm5hbWUiOiJBRE1JTiIsInVzZXJuYW1lIjoiQURNSU5fRU1BSUxAdHdpbGlvLmNvbSIsInJvbGUiOiJIQVRDSF9NQU5BR0VSIiwicm9sZUlEIjoiNCIsImlhdCI6MTY1NzgxMzk3NSwiZXhwIjoxNjU3ODE1Nzc1LCJqdGkiOiJUMm1WZG9LUDhhUk5tcXRPRGc4Mzd3In0.1IRPV5FU_P51DJUJ6o4l2pwfMq4sBjURtqbn_J0HxSY";
  const HEADER_DATA: string[] = [
    "Name",
    "Role",
    "Email",
    "Manager",
    "Manage role/relations",
  ];
  const USER_ROLES: string[] = [
    "_",
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
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    try {
      const responseData = await axios(config);
      const { data: userData } = responseData;
      setUsers(userData);
    } catch (err) {
      console.error(err);
    }
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
                <DataGridCell>{USER_ROLES[user.roleID]}</DataGridCell>
                <DataGridCell>{user.email}</DataGridCell>
                <DataGridCell>{user.manager}</DataGridCell>
                <DataGridCell>
                  <UserMaintenance
                    userToEdit={user}
                    userRoles={USER_ROLES}
                    authToken={authToken}
                    getUsers={getUsers}
                  />
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
