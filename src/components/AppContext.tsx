import React, { createContext, useContext } from "react";
import IAppSettings from "../interfaces/IAppSettings";

const defaultAppSettings: IAppSettings = {
  settingsShown: false,
  updateInterval: 30000,
};

const AppContext = createContext<IAppSettings>(defaultAppSettings);

export function useAppContext() {
  const ctx = useContext<IAppSettings>(AppContext);
  return ctx;
}

export default AppContext;
