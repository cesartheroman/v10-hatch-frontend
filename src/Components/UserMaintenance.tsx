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

/**
 *
 * The UserMaintenance is the modal component that is in charge of opening up a form, and when clicked, based on the user's role it will give the option of  either assigning an apprentice to a manager or converting a reviewer's role to a manager
 * @param {object} UserMaintenanceProps Props object that will be made up of user, userRoles array, authToken and getUsers function
 *
 */
const UserMaintenance = (props: UserMaintenanceProps) => {
  const BASE_URL = "http://localhost:9876/v1/api";
  /**
   * destructuring props to more easily use them for rendering in the rest of the component
   */
  const { userToEdit, userRoles, authToken, getUsers } = props;
  const [managers, setManagers] = useState<Manager[]>([]);
  const [managerIDToAssign, setManagerIDToAssign] = useState<number>();
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const modalHeadingID = useUID();

  /**
   * renders button with specific onClick handler based on if the role is Apprentice or Reviewer, renders nothing if some other role is selected
   * @param {string} userRole string from USER_ROLES array based on the user's roleID
   * @returns <Button> component
   */
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

  /**
   * renders dropdown options populated with all managers if role is apprentice, renders single dropdown option to convert role if role is reviewer
   * @param {object} user user object  =
   * @returns <Select> component with <Options> component
   */
  const displayModalBasedOnRole = (user: User) => {
    /**
     * Grabs user role string from USER_ROLES array at the index based on user's roleID proporty.
     */
    const userRole: string = userRoles[user.roleID];

    if (userRole === "Apprentice" && isOpen) {
      return (
        <>
          <Label htmlFor="assignApprenticeToEngMgr">Assign to Manager:</Label>
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
          <Label htmlFor="assignApprenticeToEngMgr">Update Role:</Label>
          <Select id="assignApprenticeToEngMgr" name="assignApprenticeToEngMgr">
            <Option value="EngMgr">Engineering Manager</Option>
          </Select>
        </>
      );
    } else {
      //TODO: if time permits, allow changing of other fields
      return;
    }
  };

  /**
   * Makes axios call to GET all managers from API endpoint and calls setManagers function to update state
   */
  const getManagers = async () => {
    const config: AxiosRequestConfig = {
      method: "GET",
      url: `${BASE_URL}/users/managers`,
      headers: {
        Authorization: `${authToken}`,
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

  /**
   * Makes axios call to POST apprentice to newly assigned manager
   * @param {number} apprenticeID ID of apprentice to assign to new manager
   */
  const assignApprenticeToEngMgr = async (apprenticeID: number) => {
    const requestBody = {
      apprenticeID,
    };

    const config = {
      method: "POST",
      url: `${BASE_URL}/users/managers/${managerIDToAssign}`,
      headers: {
        Authorization: `${authToken}`,
        "Content-Type": "application/json",
      },
      data: requestBody,
    };

    try {
      const response: AxiosResponse = await axios(config);
      //TODO: perhaps a toast can pop up to alert user that change was made?
      handleClose();
      getUsers();
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * Makes axios call to PATCH reviewer's role and elevate to manager role
   * @param {number} reviewerID ID of reviewer to be converted to manager role
   */
  const convertToManager = async (reviewerID: number) => {
    const requestBody = {
      roleID: 3,
    };

    const config = {
      method: "PATCH",
      url: `${BASE_URL}/users/${reviewerID}`,
      headers: {
        Authorization: `${authToken}`,
        "Content-Type": "application/json",
      },
      data: requestBody,
    };

    try {
      const response: AxiosResponse = await axios(config);
      console.log("response after converted: ", response.data);
      handleClose();
      getUsers();
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * handles change when selecting which manager to assign apprentice to from dropdown
   * @param {React.ChangeEvent<HTMLSelectElement>} e grabs manger's id in order to save to state as manager apprentice will be assigned to.
   */
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const managerID = Number(e.target.value);
    setManagerIDToAssign(managerID);
  };

  /**
   * handles what function should be called when when 'done' button is clicked in modal. Will call either of two functions based on user role: if Apprentice, call assignApprenticeToEngMgr function, if not, call convertToManager function.
   */
  const handleDone = () => {
    const userID = userToEdit.id;

    if (userRoles[userToEdit.roleID] === "Apprentice") {
      return assignApprenticeToEngMgr(userID);
    } else {
      return convertToManager(userID);
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
