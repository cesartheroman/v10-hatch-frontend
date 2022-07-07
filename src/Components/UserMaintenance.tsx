import * as React from "react";
import {
  DataGrid,
  DataGridHead,
  DataGridRow,
  DataGridHeader,
  DataGridBody,
  DataGridCell,
  DataGridFoot,
} from "@twilio-paste/core/data-grid";

const UserMaintainance = () => {
  return (
    <DataGrid aria-label="User Maintainance" striped>
      <DataGridHead>
        <DataGridRow>First Name</DataGridRow>
        <DataGridRow>Last Name</DataGridRow>
        <DataGridRow>Row</DataGridRow>
      </DataGridHead>
    </DataGrid>
  );
};

export default UserMaintainance;
