import React, { useContext } from "react";
export default function Settings() {
  return (
    <div className="settings-component">
      <div className="settings-inner">
        <h2>Settings</h2>
        <label htmlFor="update-interval">Update Interval</label>
        <input name="update-interval" value={30} />
      </div>
    </div>
  );
}
