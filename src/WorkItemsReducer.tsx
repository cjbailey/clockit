import IWorkListItem from "./interfaces/IWorkListItem";
import IWorkListAction from "./interfaces/IWorkListAction";
import { WorkListActionType } from "./types/WorkListActionType";
import { Serialise } from "./WorkListSerialiser";

export function workItemsReducer(
  state: IWorkListItem[],
  action: IWorkListAction
): IWorkListItem[] {
  let newState: IWorkListItem[];

  switch (action.type) {
    case WorkListActionType.Create:
      if (!action.value) return state;

      const w = action.value as IWorkListItem;
      newState = [...state, w];
      break;

    case WorkListActionType.Delete:
      newState = state.filter((x) => x.id !== action.value);
      break;

    case WorkListActionType.Update:
      const workItem = action.value as IWorkListItem;
      const idx = state.findIndex((x) => x.id === workItem.id);
      if (idx >= 0) {
        state[idx] = workItem;
      }
      newState = [...state];
      break;

    case WorkListActionType.Reset:
      newState = [];
      break;
  }

  localStorage.setItem("my-work-list", Serialise(newState));
  return newState;
}
