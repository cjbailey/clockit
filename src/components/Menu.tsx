import React from "react";
// @ts-ignore
import { ReactComponent as MenuIcon } from "../icons/menu-icon.svg";
import { useAppContext } from "./AppContext";
import Settings from "./Settings";

export default function Menu() {
  const appContext = useAppContext();

  const openSettings = async () => {
    // appContext.showSettings();
    await appContext.pushView(<Settings />);
  };

  return (
    <div className="app-menu">
      <div className="menu-btn" onClick={openSettings}>
        <MenuIcon width="1.5em" className="menu-icon" />
      </div>
    </div>
  );
}
