import * as React from "react";
import axios from "axios";
import "../styles.css";
import { useEffect, useState } from "react";
import { Button } from "@twilio-paste/core/button";
import { Heading } from "@twilio-paste/core";
import {
  DataGrid,
  DataGridHead,
  DataGridRow,
  DataGridHeader,
  DataGridBody,
  DataGridCell,
} from "@twilio-paste/core/data-grid";

const UserMaintainance = () => {
  const BASE_URL: string = "http://localhost:3000/users";
  const HEADER_DATA: string[] = ["Name", "Role", "Email", "Update"];
  const USER_ROLES: string[] = ["Apprentice", "Reviewer", "Manager", "ADMIN"];
  const [users, setUsers] = useState<User[]>([]);

  interface User {
    id: number;
    email: string;
    name: string;
    roleID: number;
  }

  const getUsers = async () => {
    try {
      const responseData = await axios.get(BASE_URL);
      const { data: userData } = responseData;
      setUsers(userData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.target);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
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
                  <Button variant="primary" onClick={(e) => handleClick(e)}>
                    Update
                  </Button>
                </DataGridCell>
              </DataGridRow>
            );
          })}
        </DataGridBody>
      </DataGrid>
    </div>
  );
};

export default UserMaintainance;
