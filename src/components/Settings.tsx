import React, { ChangeEvent, KeyboardEvent, MouseEvent, useState } from "react";
import { useAppContext } from "./AppContext";
import DeleteButton from "./DeleteButton";
import Dialog from "./Dialog";

const validTimeFormats = ["hh:mm:ss", "hh:mm"];

export default function Settings() {
  const appContext = useAppContext();
  const [intervalValue, setIntervalValue] = useState(appContext.settings.updateInterval / 1000);
  const [timeFormat, setTimeFormat] = useState(appContext.settings.timeFormat);

  const closeSettings = () => {
    appContext.setUpdateInterval(intervalValue * 1000);
    appContext.setTimeFormat(timeFormat);
    appContext.popView();
  };

  const changeInterval = (ev: ChangeEvent<HTMLInputElement>) => {
    setIntervalValue(parseInt(ev.target.value));
  };

  const inputKeyUp = (ev: KeyboardEvent<HTMLInputElement>) => {
    if (ev.code === "Enter" || ev.code === "NumpadEnter") {
      closeSettings();
      ev.preventDefault;
    }
  };

  const changeTimeFormat = (ev: ChangeEvent<HTMLSelectElement>) => {
    setTimeFormat(ev.target.value);
  };

  const clickOutsideComponent = () => {
    closeSettings();
  };

  return (
    <Dialog className="settings-component" title="Settings" onClose={clickOutsideComponent}>
      <div className="row">
        <label htmlFor="update-interval" className="dialog-input-label">
          Update every
        </label>
        <input
          name="update-interval"
          className="dialog-input-control"
          type="number"
          value={intervalValue}
          onChange={changeInterval}
          onKeyUp={inputKeyUp}
          min={0}
          max={300}
        />
        <span>seconds</span>
      </div>
      <div className="row">
        <label htmlFor="time-format" className="dialog-input-label">
          Time format
        </label>
        <select
          className="dialog-input control time-format-picker"
          onChange={changeTimeFormat}
          defaultValue={timeFormat}
        >
          {validTimeFormats.map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
        {/* <input name="time-format" value={timeFormat} onChange={changeTimeFormat} onKeyUp={inputKeyUp} /> */}
      </div>
    </Dialog>
  );
}
