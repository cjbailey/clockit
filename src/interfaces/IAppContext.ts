import { ViewStyle } from "../ViewStyle";
import IAppSettings from "./IAppSettings";

export default interface IAppContext {
  settings: IAppSettings;
  setUpdateInterval(interval: number): void;
  setTimeFormat(format: string): void;
  setViewStyle(viewStyle: ViewStyle): void;
  pushView<T>(view: JSX.Element): Promise<T>;
  popView(value?: any): void;
}
