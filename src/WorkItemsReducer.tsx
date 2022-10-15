import IWorkListItem from "./interfaces/IWorkListItem";
import IWorkListAction from "./interfaces/IWorkListAction";
import { WorkListActionType } from "./types/WorkListActionType";
import { Serialise } from "./WorkListSerialiser";
import Time from "./types/Time";

export function workItemsReducer(state: IWorkListItem[], action: IWorkListAction): IWorkListItem[] {
  let newState: IWorkListItem[];
  const workListItem = action.value as IWorkListItem;

  switch (action.type) {
    case WorkListActionType.Create:
      if (!action.value) return state;

      newState = [...state, workListItem];
      break;

    case WorkListActionType.Delete:
      newState = state.filter((x) => x.id !== action.value);
      break;

    case WorkListActionType.Update:
      state = workListUpdate(state, workListItem);
      newState = [...state];
      break;

    case WorkListActionType.Reset:
      newState = [];
      break;

    case WorkListActionType.ResetTimes:
      newState = state.map((x) => {
        x.startTime = new Time();
        x.lastStartTime = new Time();
        x.elapsedTime = new Time();
        return x;
      });
      break;

    default:
      newState = state;
  }

  localStorage.setItem("my-work-list", Serialise(newState));
  return newState;
}

function workListUpdate(state: IWorkListItem[], workListItem: IWorkListItem) {
  const idx = state.findIndex((x) => x.id === workListItem.id);
  if (idx >= 0) {
    state[idx] = workListItem;
  }

  return state;
}
