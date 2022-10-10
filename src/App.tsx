import { useReducer } from "react";
import WorkList from "./components/WorkList";
import IWorkListItem from "./interfaces/IWorkListItem";
import "./styles.scss";
import { workItemsReducer } from "./WorkItemsReducer";
import { Deserialise } from "./WorkListSerialiser";

function getWorkList(): IWorkListItem[] {
  let workListItems: IWorkListItem[] = [];
  let ls = localStorage.getItem("my-work-list");

  try {
    workListItems = Deserialise(ls);
  } catch {
    localStorage.setItem("my-work-list", JSON.stringify([]));
  }

  return workListItems;
}

export default function App() {
  const [workItems, workItemDispatcher] = useReducer(
    workItemsReducer,
    [],
    getWorkList
  );

  return (
    <div className="App">
      <WorkList items={workItems} workItemDispatcher={workItemDispatcher} />
    </div>
  );
}
