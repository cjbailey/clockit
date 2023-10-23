// @ts-ignore
import React, { ReactComponent as MenuIcon } from "../icons/menu-icon.svg";
import { ReactComponent as ClockIcon } from "../icons/clock-icon.svg";
import { ReactComponent as GanttIcon } from "../icons/gantt-icon.svg";
import { useAppContext } from "./AppContext";
import Button from "./Button";
import Settings from "./Settings";
import { ViewStyle } from "../ViewStyle";

export default function Menu() {
  const appContext = useAppContext();

  const openSettings = async () => {
    if (appContext) {
      const view = <Settings />;
      await appContext.pushView(view);
    }
  };

  const toggleView = async () => {
    switch (appContext.settings.currentViewStyle) {
      case ViewStyle.Gantt:
        appContext.setViewStyle(ViewStyle.Timer);
        break;

      case ViewStyle.Timer:
        appContext.setViewStyle(ViewStyle.Gantt);
        break;
    }
  };

  return (
    <div className="app-menu">
      <Button className="menu-btn" onClick={openSettings}>
        <MenuIcon width="1.5em" className="menu-icon" />
      </Button>
      {appContext.settings.currentViewStyle === ViewStyle.Gantt &&
        <Button className="menu-btn" onClick={toggleView}>
          <ClockIcon width="1.5em" className="menu-icon" />
        </Button>
      }
      {appContext.settings.currentViewStyle === ViewStyle.Timer &&
        <Button className="menu-btn" onClick={toggleView}>
          <GanttIcon width="1.5em" className="menu-icon" />
        </Button>
      }
    </div>
  );
}
