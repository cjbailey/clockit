import React, { MouseEventHandler } from "react";
// @ts-ignore
import { ReactComponent as DeleteIcon } from "../icons/delete-icon.svg";

interface IProps {
  onClick?: MouseEventHandler;
}

export default function DeleteButton({ onClick }: IProps): JSX.Element {
  return (
    <div className="delete-btn" onClick={onClick}>
      <DeleteIcon width="0.8em" />
    </div>
  );
}
