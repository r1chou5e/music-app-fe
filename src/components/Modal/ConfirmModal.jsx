import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogFooter,
  DialogBody,
  DialogHeader,
} from "@material-tailwind/react";

const ConfirmModal = ({
  open,
  handleClose,
  handleConfirm,
  headerText,
  contentText,
  confirmText,
  cancelText,
}) => {
  return (
    <Dialog open={open} size="sm">
      <DialogHeader>It's a simple dialog.</DialogHeader>

      <DialogBody divider>Are you sure to delete this user?</DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="black"
          className="mr-1"
          onClick={() => handleClose()}
        >
          <span>Cancel</span>
        </Button>
        <Button variant="gradient" color="red" onClick={() => handleConfirm()}>
          <span>Confirm</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ConfirmModal;
