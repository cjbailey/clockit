import React, { useReducer } from "react";
import AppContext from "./components/AppContext";
import Menu from "./components/Menu";
import Settings from "./components/Settings";
import WorkList from "./components/WorkList";
import IAppSettings from "./interfaces/IAppSettings";
import IWorkListItem from "./interfaces/IWorkListItem";
import "./styles.scss";
import { workItemsReducer } from "./WorkItemsReducer";
import { Deserialise } from "./WorkListSerialiser";

function getWorkList(): IWorkListItem[] {
  let workListItems: IWorkListItem[] = [];
  const ls = localStorage.getItem("my-work-list");

  try {
    workListItems = Deserialise(ls);
  } catch {
    localStorage.setItem("my-work-list", JSON.stringify([]));
  }

  return workListItems;
}

const appSettings: IAppSettings = {
  settingsShown: false,
  updateInterval: 30000,
};

export default function App() {
  const [workItems, workItemDispatcher] = useReducer(workItemsReducer, [], getWorkList);

  return (
    <AppContext.Provider value={appSettings}>
      <div className="App">
        <Menu />
        <WorkList items={workItems} workItemDispatcher={workItemDispatcher} />
        {appSettings.settingsShown && <Settings />}
      </div>
    </AppContext.Provider>
  );
}
