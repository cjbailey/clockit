import React, { useReducer } from "react";
import AppContext, { useAppContext } from "./components/AppContext";
import Menu from "./components/Menu";
import Settings from "./components/Settings";
import WorkList from "./components/WorkList";
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

export default function App() {
  const [workItems, workItemDispatcher] = useReducer(workItemsReducer, [], getWorkList);

  const appContext = useAppContext();

  return (
    <div className="App">
      <Menu />
      <WorkList items={workItems} workItemDispatcher={workItemDispatcher} />
      {/* {appContext.settingsShown && <Settings />} */}
    </div>
  );
}
