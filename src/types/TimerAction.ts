import IWorkListItem from "../interfaces/IWorkListItem";
import Time from "./Time";

type CallbackFn = () => void;

export default class TimerAction {
  public readonly workListItem: IWorkListItem;
  private _cancellationToken = 0;
  private readonly _interval: number;
  private readonly _onIntervalCallback: CallbackFn | undefined;

  constructor(
    item: IWorkListItem,
    onIntervalCallback?: CallbackFn,
    interval = 60000
  ) {
    this.workListItem = item;
    this._onIntervalCallback = onIntervalCallback;
    this._interval = interval;
  }

  public get isActive() {
    return this._cancellationToken !== 0;
  }

  public start() {
    const elapsedTimeAtStart = this.workListItem.elapsedTime;

    this._cancellationToken = window.setInterval(() => {
      this.workListItem.elapsedTime = Time.now()
        .sub(this.workListItem.lastStartTime)
        .add(elapsedTimeAtStart);

      if (this._onIntervalCallback) {
        this._onIntervalCallback();
      }
    }, this._interval);
  }

  public stop() {
    if (this.isActive) {
      window.clearInterval(this._cancellationToken);
      this._cancellationToken = 0;
    }
  }
}
