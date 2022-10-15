import React, { MouseEventHandler } from "react";
// @ts-ignore
import { ReactComponent as DeleteIcon } from "../icons/delete-icon.svg";
import Button from "./Button";

interface IProps {
  onClick?: MouseEventHandler;
}

export default function DeleteButton({ onClick }: IProps): JSX.Element {
  return (
    <Button className="delete-btn img-btn" onClick={onClick}>
      <DeleteIcon width="0.8em" />
    </Button>
  );
}
