import React, { useContext, useState } from "react";
import { ReactComponent as MenuIcon } from "../icons/menu-icon.svg";
import IAppSettings from "../interfaces/IAppSettings";
import { useAppContext } from "./AppContext";

export default function Menu() {
  const appContext = useAppContext();

  const [showSettings, setShowSettings] = useState(false);
  const openSettings = () => {
    setShowSettings(true);
    appContext.settingsShown = true;
  };

  return (
    <div className="app-menu">
      <button className="menu-btn" onClick={openSettings}>
        <MenuIcon width="1.5em" className="menu-icon" />
      </button>
    </div>
  );
}
