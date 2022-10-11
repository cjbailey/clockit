import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import IAppSettings from "../interfaces/IAppSettings";

const LS_SETTINGS = "clockit-settings";

let defaultAppSettings: IAppSettings = {
  settingsShown: false,
  showSettings() {},
  hideSettings() {},
  updateInterval: 30000,
  setUpdateInterval() {},
  timeFormat: "hh:mm:ss",
  setTimeFormat() {},
};

const lsAppSettings = localStorage.getItem(LS_SETTINGS);
if (lsAppSettings) {
  defaultAppSettings = JSON.parse(lsAppSettings) as IAppSettings;
} else {
  localStorage.setItem(LS_SETTINGS, JSON.stringify({
    updateInterval: defaultAppSettings.updateInterval,
    timeFormat: defaultAppSettings.timeFormat
  }));
}

const _AppContext = createContext<IAppSettings>(defaultAppSettings);

const AppContext = (props: PropsWithChildren) => {
  const [showSettings, setShowSettings] = useState(defaultAppSettings.settingsShown);
  const [updateInterval, setUpdateInterval] = useState(defaultAppSettings.updateInterval);
  const [timeFormat, setTimeFormat] = useState(defaultAppSettings.timeFormat);

  useEffect(() => {
    localStorage.setItem(LS_SETTINGS, JSON.stringify({
      updateInterval,
      timeFormat
    }));
  }, [updateInterval, timeFormat]);

  return (
    <_AppContext.Provider
      value={{
        settingsShown: showSettings,
        showSettings() {
          setShowSettings(true);
        },
        hideSettings() {
          setShowSettings(false);
        },
        updateInterval,
        setUpdateInterval,
        timeFormat,
        setTimeFormat,
      }}
    >
      {props.children}
    </_AppContext.Provider>
  );
};

export function useAppContext() {
  const ctx = useContext<IAppSettings>(_AppContext);
  return ctx;
}

export default AppContext;
