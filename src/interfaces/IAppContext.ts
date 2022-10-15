import IAppSettings from "./IAppSettings";

export default interface IAppContext {
  settings: IAppSettings;
  setUpdateInterval(interval: number): void;
  setTimeFormat(format: string): void;
  pushView<T>(view: JSX.Element): Promise<T>;
  popView(value?: any): void;
}
