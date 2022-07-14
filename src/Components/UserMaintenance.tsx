import * as React from "react";
import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { User } from "./UserMaintenanceView";
import { useUID } from "@twilio-paste/core/uid-library";
import { Button } from "@twilio-paste/core/button";
import { Box } from "@twilio-paste/core";
import { Label } from "@twilio-paste/core/label";
import { Select, Option } from "@twilio-paste/core/select";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalFooterActions,
  ModalHeader,
  ModalHeading,
} from "@twilio-paste/core/modal";

interface UserMaintenanceProps {
  userToEdit: User;
  userRoles: string[];
  authToken: string;
  getUsers: () => void;
}

interface Manager {
  id: number;
  name: string;
  roleID: number;
  email: string;
  apprentices: string[];
}

const UserMaintenance = (props: UserMaintenanceProps) => {
  const BASE_URL = "http://localhost:9876/v1/api";
  const { userToEdit, userRoles, authToken, getUsers } = props;
  const [managers, setManagers] = useState<Manager[]>([]);
  const [managerIDToAssign, setManagerIDToAssign] = useState<number>();
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const modalHeadingID = useUID();

  const displayButtonBasedOnRole = (userRole: string) => {
    if (userRole === "Apprentice" || userRole === "Reviewer") {
      return (
        <Button variant="primary" onClick={handleOpen}>
          Manage
        </Button>
      );
    } else {
      return null;
    }
  };

  const displayModalBasedOnRole = (user: User) => {
    const userRole = userRoles[user.roleID];
    if (userRole === "Apprentice" && isOpen) {
      return (
        <>
          <Label htmlFor="assignApprenticeToEngMgr">Assign to Manager: </Label>
          <Select
            id="assignApprenticeToEngMgr"
            name="assignApprenticeToEngMgr"
            onChange={handleChange}
          >
            {managers.map((manager: Manager) => {
              return (
                <Option value={`${manager.id}`} key={manager.id}>
                  {manager.name}
                </Option>
              );
            })}
          </Select>
        </>
      );
    } else if (userRole === "Reviewer" && isOpen) {
      return (
        <>
          <Label htmlFor="assignApprenticeToEngMgr">Update Role</Label>
          <Select id="assignApprenticeToEngMgr" name="assignApprenticeToEngMgr">
            <Option value="EngMgr">Engineering Manager</Option>
          </Select>
        </>
      );
    } else {
      //TODO: if time permits, allow changing of other fields
      return null;
    }
  };

  const getManagers = async () => {
    const config: AxiosRequestConfig = {
      method: "GET",
      url: `${BASE_URL}/users/managers`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    try {
      const responseData: AxiosResponse = await axios(config);
      const { data: managerData } = responseData;
      setManagers(managerData);
    } catch (err) {
      console.error(err);
    }
  };

  const assignApprenticeToEngMgr = async (apprenticeID: number) => {
    const requestBody = {
      apprenticeID,
    };

    const config = {
      method: "POST",
      url: `${BASE_URL}/users/managers/${managerIDToAssign}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      data: requestBody,
    };

    try {
      const response: AxiosResponse = await axios(config);
      //TODO: wait for backend to update response
      handleClose();
      getUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const convertToManager = async (userID: number) => {
    const requestBody = { userID };
    const config = {
      method: "PATCH",
      url: `${BASE_URL}/users/${userID}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      data: requestBody,
    };

    try {
      const response: AxiosResponse = await axios(config);
      //TODO: wait for backend to update response
      handleClose();
      getUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const managerID = Number(e.target.value);
    setManagerIDToAssign(managerID);
  };

  const handleDone = () => {
    if (userRoles[userToEdit.roleID] === "Apprentice") {
      return assignApprenticeToEngMgr(userToEdit.id);
    } else {
      return convertToManager(userToEdit.roleID);
    }
  };

  useEffect(() => {
    getManagers();
  }, []);

  return (
    <div>
      {displayButtonBasedOnRole(userRoles[userToEdit.roleID])}
      <Modal
        ariaLabelledby={modalHeadingID}
        isOpen={isOpen}
        onDismiss={handleClose}
        size="default"
      >
        <ModalHeader>
          <ModalHeading as="h3" id={modalHeadingID}>
            Maintance for {userToEdit.name}
          </ModalHeading>
        </ModalHeader>
        <ModalBody>
          <Box as="form">{displayModalBasedOnRole(userToEdit)}</Box>
        </ModalBody>
        <ModalFooter>
          <ModalFooterActions>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleDone}>
              Done
            </Button>
          </ModalFooterActions>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default UserMaintenance;
