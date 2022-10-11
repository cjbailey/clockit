import React from "react";
import { ReactComponent as MenuIcon } from "../icons/menu-icon.svg";
import { useAppContext } from "./AppContext";

export default function Menu() {
  const appContext = useAppContext();

  const openSettings = () => {
    appContext.showSettings();
  };

  return (
    <div className="app-menu">
      <button className="menu-btn" onClick={openSettings}>
        <MenuIcon width="1.5em" className="menu-icon" />
      </button>
    </div>
  );
}
