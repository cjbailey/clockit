import React, { useContext } from "react";
import { useAppContext } from "./AppContext";

export default function Settings() {
  const appContext = useAppContext();

  const closeSettings = () => {
    appContext.hideSettings();
  };

  return (
    <div className="settings-component">
      <div className="settings-inner">
        <h2>Settings</h2>
        <label htmlFor="update-interval">Update Interval</label>
        <input name="update-interval" value={30} />
        <button onClick={closeSettings}>Close</button>
      </div>
    </div>
  );
}
