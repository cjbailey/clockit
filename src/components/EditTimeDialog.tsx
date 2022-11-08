import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import Time from "../types/Time";
import { useAppContext } from "./AppContext";
import Dialog from "./Dialog";

interface IProps {
  startTime: Time;
  elapsedTime: Time;
}

export default function EditTimeDialog({ startTime, elapsedTime }: IProps) {
  const appContext = useAppContext();
  const [_startTime, setStartTime] = useState(startTime);
  const [_elapsedTime, setElapsedTime] = useState(elapsedTime);

  const closeDialog = () => {
    appContext.popView({ startTime: _startTime, elapsedTime: _elapsedTime });
  };

  const clickOutsideComponent = () => {
    closeDialog();
  };

  const changeStartTime = (ev: ChangeEvent<HTMLInputElement>) => {
    setStartTime(new Time(ev.target.value));
  };

  const changeElapsedTime = (ev: ChangeEvent<HTMLInputElement>) => {
    setElapsedTime(new Time(ev.target.value));
  };

  const detectEnterKey = (ev: KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === "Enter") {
      closeDialog();
    }
  };

  return (
    <Dialog className="edit-start-time-dialog" title="Edit Time" onClose={clickOutsideComponent}>
      <div className="dialog-input row">
        <div className="dialog-input-label">Start Time</div>
        <div className="dialog-input-control">
          <input
            type="time"
            value={_startTime.toString(appContext.settings.timeFormat)}
            onChange={changeStartTime}
            onKeyUp={detectEnterKey}
          />
        </div>
      </div>
      <div className="dialog-input row">
        <div className="dialog-input-label">Elapsed Time</div>
        <div className="dialog-input-control">
          <input
            type="time"
            value={_elapsedTime.toString(appContext.settings.timeFormat)}
            onChange={changeElapsedTime}
            onKeyUp={detectEnterKey}
          />
        </div>
      </div>
    </Dialog>
  );
}
