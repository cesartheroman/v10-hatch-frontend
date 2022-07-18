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

/**
 *
 * The UserMaintenanceView is the component responsible for rendering out each user within the applicaton. In specific it renders the user's name, email, role, manager, and 'Manage' button/modal that, depending on their role, will allow an apprentice to be assigned to a manager or a reviewer's role to be elevated to manager.
 *
 *
 */
const UserMaintainanceView = () => {
  const BASE_URL: string = "http://localhost:9876/v1/api";
  const authToken: any = localStorage.getItem("token");
  const [users, setUsers] = useState<User[]>([]);

  /**
   * @type {string[]}
   * HEADER_DATA array is used to populate DataGrid headers
   */
  const HEADER_DATA: string[] = [
    "Name",
    "Role",
    "Email",
    "Manager",
    "Manage role/relations",
  ];

  /**
   * @type {string[]}
   * USER_ROLES array is used to generate string representation of user roleID to render on DataGrid
   * First element is '_' since roleIDs start at 1.
   */
  const USER_ROLES: string[] = [
    "_",
    "Apprentice",
    "Reviewer",
    "Manager",
    "Hatch Manager",
  ];

  /**
   *  Makes axios call to GET all users from API endpoint and calls setUsers function to update state
   */
  const getUsers = async () => {
    const config: AxiosRequestConfig = {
      method: "GET",
      url: BASE_URL + "/users",
      headers: {
        Authorization: `${authToken}`,
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
