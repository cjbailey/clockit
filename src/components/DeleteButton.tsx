import React, { MouseEventHandler } from "react";
import { ReactComponent as DeleteIcon } from "../icons/delete-icon.svg";

interface IProps {
  onClick?: MouseEventHandler;
}

export default function DeleteButton({ onClick }: IProps): JSX.Element {
  return (
    <button className="delete-btn" onClick={onClick}>
      <DeleteIcon width="0.8em" />
    </button>
  );
}
