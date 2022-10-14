import IAppSettings from "./IAppSettings";

export default interface IAppContext {
  settings: IAppSettings;
  settingsShown: boolean;
  showSettings(): void;
  hideSettings(): void;
  setUpdateInterval(interval: number): void;
  setTimeFormat(format: string): void;
  pushView(view: JSX.Element): Promise<void>;
  popView(): void;
}
