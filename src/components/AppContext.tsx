import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import IAppSettings from "../interfaces/IAppSettings";

const defaultAppSettings: IAppSettings = {
  settingsShown: false,
  showSettings() {},
  hideSettings() {},
  updateInterval: 30000,
  setUpdateInterval() {},
};

const _AppContext = createContext<IAppSettings>(defaultAppSettings);

const AppContext = (props: PropsWithChildren) => {
  const [showSettings, setShowSettings] = useState(
    defaultAppSettings.settingsShown
  );
  const [updateInterval, setUpdateInterval] = useState(
    defaultAppSettings.updateInterval
  );

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
