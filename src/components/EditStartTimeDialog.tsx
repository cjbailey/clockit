import React, { ChangeEvent, MouseEvent, useState } from "react";
import Time from "../types/Time";
import { useAppContext } from "./AppContext";
import Dialog from "./Dialog";

interface IProps {
  startTime: Time;
}

export default function EditStartTimeDialog({ startTime }: IProps) {
  const appContext = useAppContext();
  const [time, setTime] = useState(startTime);

  const closeDialog = () => {
    appContext.popView(time);
  };

  const clickOutsideComponent = () => {
    closeDialog();
  };

  const changeTime = (ev: ChangeEvent<HTMLInputElement>) => {
    setTime(new Time(ev.target.value));
  };

  return (
    <Dialog className="edit-start-time-dialog" title="Set Start Time" onClose={clickOutsideComponent}>
      <div className="dialog-input row">
        <div className="dialog-input-label">Start Time</div>
        <div className="dialog-input-control">
          <input type="time" value={time.toString(appContext.settings.timeFormat)} onChange={changeTime} />
        </div>
      </div>
    </Dialog>
  );
}
