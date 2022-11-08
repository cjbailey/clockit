import React from "react";
import { useAppContext } from "./AppContext";
import Button from "./Button";

interface IProps {
  message: string;
  acceptText: string;
  cancelText?: string;
  className?: string;
}

export default function ConfirmDialog({ message, acceptText, cancelText, className = "" }: IProps) {
  const appContext = useAppContext();

  const accept = async () => {
    if (appContext) {
      await appContext.popView(true);
    }
  };

  const cancel = async () => {
    if (appContext) {
      await appContext.popView(false);
    }
  };

  return (
    <div className="full-screen-overlay">
      <div className={`confirm-dialog ${className}`}>
        <div className="confirm-dialog-message">{message}</div>
        <div className="confirm-dialog-buttons">
          <Button className="confirm-dialog-btn" onClick={accept}>
            {acceptText}
          </Button>
          {cancelText && (
            <Button className="confirm-dialog-btn" onClick={cancel}>
              {cancelText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
