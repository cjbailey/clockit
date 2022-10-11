export default interface IAppSettings {
  settingsShown: boolean;
  showSettings(): void;
  hideSettings(): void;
  updateInterval: number;
  setUpdateInterval(interval: number): void;
  timeFormat: string;
  setTimeFormat(format: string): void;
}
