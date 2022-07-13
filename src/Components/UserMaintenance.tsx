import * as React from "react";
import { useState, useEffect } from "react";
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
}

const UserMaintenance = (props: UserMaintenanceProps) => {
  //TODO: need to pass current user to populate modal header and grab current roleID to change

  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const modalHeadingID = useUID();
  const { userToEdit, userRoles } = props;

  const figureOutRoles = (user: User) => {
    const userRole = userRoles[user.roleID - 1];
    if (userRole === "Apprentice") {
      //TODO: need to get all managers to render Options
      return (
        <>
          <Label htmlFor="assignApprenticeToEngMgr">Assign new manager!</Label>
          <Select id="assignApprenticeToEngMgr" name="assignApprenticeToEngMgr">
            <Option value="foo-bar">Foo Bar</Option>
            <Option value="bar-foo">Bar Foo</Option>
          </Select>
        </>
      );
    } else {
      return "you're not an apprentice";
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={handleOpen}>
        Edit User
      </Button>
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
          <Box as="form">
            {figureOutRoles(userToEdit)}
            {/* <Label htmlFor="assignApprenticeToEngMgr">Edit User</Label>
            <Select
              id="assignApprenticeToEngMgr"
              name="assignApprenticeToEngMgr"
            >
              <Option value="foo-bar">Foo Bar</Option>
              <Option value="bar-foo">Bar Foo</Option>
            </Select> */}
          </Box>
        </ModalBody>
        <ModalFooter>
          <ModalFooterActions>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary">Done</Button>
          </ModalFooterActions>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default UserMaintenance;
