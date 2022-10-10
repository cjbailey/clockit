import Time from "../types/Time";
import { WorkListItemId } from "../types/WorkListItemId";

export default interface IWorkListItem {
  id: WorkListItemId;
  title: string;
  startTime: Time;
  lastStartTime: Time;
  elapsedTime: Time;
}
