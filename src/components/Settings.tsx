import React, { ChangeEvent, KeyboardEvent, MouseEvent, useState } from "react";
import { useAppContext } from "./AppContext";
import DeleteButton from "./DeleteButton";

const validTimeFormats = ["hh:mm:ss", "hh:mm"];

export default function Settings() {
  const appContext = useAppContext();
  const [intervalValue, setIntervalValue] = useState(appContext.settings.updateInterval / 1000);
  const [timeFormat, setTimeFormat] = useState(appContext.settings.timeFormat);

  const closeSettings = () => {
    appContext.setUpdateInterval(intervalValue * 1000);
    appContext.setTimeFormat(timeFormat);
    // appContext.hideSettings();
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

  const clickOutsideComponent = (ev: MouseEvent<HTMLDivElement>) => {
    if ((ev.target as HTMLElement)?.className === "settings-component") {
      closeSettings();
    }
  };

  return (
    <div className="settings-component" onClick={clickOutsideComponent}>
      <div className="settings-inner">
        <h2>Settings</h2>
        <div className="row">
          <label htmlFor="update-interval">Update every</label>
          {/* <span>Update every</span> */}
          <input
            name="update-interval"
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
          <label htmlFor="time-format">Time format</label>
          <select className="time-format-picker" onChange={changeTimeFormat} defaultValue={timeFormat}>
            {validTimeFormats.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
          {/* <input name="time-format" value={timeFormat} onChange={changeTimeFormat} onKeyUp={inputKeyUp} /> */}
        </div>
        <DeleteButton onClick={closeSettings} />
      </div>
    </div>
  );
}
