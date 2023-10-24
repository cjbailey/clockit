import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import IAppContext from "../interfaces/IAppContext";
import IAppSettings from "../interfaces/IAppSettings";
import IViewStackItem from "../interfaces/IViewStackItem";
import { ViewStyle } from "../ViewStyle";

const LS_SETTINGS = "timeout-settings";

const defaultAppContext: IAppContext = {
  settings: {
    updateInterval: 30000,
    timeFormat: "hh:mm:ss",
    currentViewStyle: ViewStyle.Timer
  },
  setUpdateInterval() { },
  setTimeFormat() { },
  setViewStyle() { },
  pushView() {
    return Promise.reject("Not implemented");
  },
  popView() { },
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
      currentViewStyle: defaultAppContext.settings.currentViewStyle
    })
  );
}

const _AppContext = createContext<IAppContext>(defaultAppContext);

const AppContext = (props: PropsWithChildren) => {
  const [updateInterval, setUpdateInterval] = useState(defaultAppContext.settings.updateInterval);
  const [timeFormat, setTimeFormat] = useState(defaultAppContext.settings.timeFormat);
  const [viewStack, setViewStack] = useState<IViewStackItem[]>([]);
  const [currentViewStyle, setViewStyle] = useState<ViewStyle>(defaultAppContext.settings.currentViewStyle);

  useEffect(() => {
    localStorage.setItem(
      LS_SETTINGS,
      JSON.stringify({
        updateInterval,
        timeFormat,
        currentViewStyle
      })
    );
  }, [updateInterval, timeFormat, currentViewStyle]);

  const pushView = async <T,>(component: JSX.Element): Promise<T> => {
    return new Promise((resolver) => {
      setViewStack((prev) => {
        return [...prev, { component, resolver }];
      });
    });
  };

  const popView = (value?: any): void => {
    const lastView = viewStack.pop();
    if (lastView && lastView.resolver) {
      lastView.resolver(value);
    }
    setViewStack([...viewStack]);
  };

  return (
    <_AppContext.Provider
      value={{
        settings: {
          updateInterval,
          timeFormat,
          currentViewStyle
        },
        setUpdateInterval,
        setTimeFormat,
        setViewStyle,
        pushView,
        popView,
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
