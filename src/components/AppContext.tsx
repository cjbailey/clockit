import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import IAppContext from "../interfaces/IAppContext";
import IAppSettings from "../interfaces/IAppSettings";
import IViewStackItem from "../interfaces/IViewStackItem";

const LS_SETTINGS = "clockit-settings";

const defaultAppContext: IAppContext = {
  settings: {
    updateInterval: 30000,
    timeFormat: "hh:mm:ss",
  },
  settingsShown: false,
  showSettings() {},
  hideSettings() {},
  setUpdateInterval() {},
  setTimeFormat() {},
  pushView() {
    return Promise.reject("Not implemented");
  },
  popView() {},
};

const lsAppSettings = localStorage.getItem(LS_SETTINGS);
if (lsAppSettings) {
  defaultAppContext.settings = JSON.parse(lsAppSettings) as IAppSettings;
} else {
  localStorage.setItem(
    LS_SETTINGS,
    JSON.stringify({
      updateInterval: defaultAppContext.settings.updateInterval,
      timeFormat: defaultAppContext.settings.timeFormat,
    })
  );
}

const _AppContext = createContext<IAppContext>(defaultAppContext);

const AppContext = (props: PropsWithChildren) => {
  const [showSettings, setShowSettings] = useState(defaultAppContext.settingsShown);
  const [updateInterval, setUpdateInterval] = useState(defaultAppContext.settings.updateInterval);
  const [timeFormat, setTimeFormat] = useState(defaultAppContext.settings.timeFormat);
  const [viewStack, setViewStack] = useState<IViewStackItem[]>([]);

  useEffect(() => {
    localStorage.setItem(
      LS_SETTINGS,
      JSON.stringify({
        updateInterval,
        timeFormat,
      })
    );
  }, [updateInterval, timeFormat]);

  return (
    <_AppContext.Provider
      value={{
        settings: {
          updateInterval,
          timeFormat,
        },
        settingsShown: showSettings,
        showSettings() {
          setShowSettings(true);
        },
        hideSettings() {
          setShowSettings(false);
        },
        setUpdateInterval,
        setTimeFormat,
        pushView(component: JSX.Element) {
          return new Promise((resolver) => {
            setViewStack([...viewStack, { component, resolver }]);
          });
        },
        popView(value?: any) {
          const lastView = viewStack.pop();
          if (lastView) {
            lastView.resolver(value);
          }
          setViewStack([...viewStack]);
        },
      }}
    >
      {props.children}
      {viewStack.map((view, index) => (
        <div key={`view-${index}`}>{view.component}</div>
      ))}
    </_AppContext.Provider>
  );
};

export function useAppContext() {
  const ctx = useContext<IAppContext>(_AppContext);
  return ctx;
}

export default AppContext;
