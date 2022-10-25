import React, { PropsWithChildren, MouseEvent } from "react";
import DeleteButton from "./DeleteButton";

export interface IDialogProps {
  className?: string;
  title?: string;
  onClose?: () => void;
}

export default function Dialog({ className, title, children, onClose }: PropsWithChildren<IDialogProps>) {
  const closeDialog = (ev?: MouseEvent) => {
    ev?.preventDefault();
    ev?.stopPropagation();
    if (onClose) onClose();
  };

  const clickOutsideComponent = (ev: MouseEvent<HTMLDivElement>) => {
    if ((ev.target as HTMLElement)?.className.match("full-screen-overlay")) {
      closeDialog();
    }
  };

  return (
    <div className={`${className || ""} full-screen-overlay`} onClick={clickOutsideComponent}>
      <div className="dialog">
        <div className="dialog-header">
          <div className="dialog-title">{title}</div>
          <div className="dialog-close">
            <DeleteButton onClick={closeDialog} />
          </div>
        </div>
        <div className="dialog-body">{children}</div>
      </div>
    </div>
  );
}
