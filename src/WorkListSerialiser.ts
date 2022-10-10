import IWorkListItem from "./interfaces/IWorkListItem";
import Time from "./types/Time";

export function Serialise(obj: IWorkListItem[]): string {
  return JSON.stringify(obj);
}

export function Deserialise(json: string | null): IWorkListItem[] {
  if (json === null) {
    return [];
  }

  const obj = JSON.parse(json, (key: string, value: any) => {
    switch (key) {
      case "startTime":
      case "lastStartTime":
      case "elapsedTime":
        return new Time(value._timeInMs);

      default:
        return value;
    }
  });

  return obj;
}
