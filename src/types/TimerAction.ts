import Time from "./Time";

type CallbackFn = (elapsedTime: Time) => void;

export default class TimerAction {
  // #region Properties (5)

  private readonly _interval: number;
  private readonly _lastStartTime: Time;
  private readonly _onIntervalCallback: CallbackFn | undefined;

  private _cancellationToken = 0;
  private _elapsedTime: Time;

  // #endregion Properties (5)

  // #region Constructors (1)

  constructor(startElapsedTime: Time, lastStartTime: Time, onIntervalCallback?: CallbackFn, interval = 60000) {
    this._elapsedTime = startElapsedTime;
    this._lastStartTime = lastStartTime;
    this._onIntervalCallback = onIntervalCallback;
    this._interval = interval;
  }

  // #endregion Constructors (1)

  // #region Public Accessors (2)

  public get elapsedTime() {
    return this._elapsedTime;
  }

  public get isActive() {
    return this._cancellationToken !== 0;
  }

  // #endregion Public Accessors (2)

  // #region Public Methods (2)

  public start() {
    const elapsedTimeAtStart = this._elapsedTime;

    this._cancellationToken = window.setInterval(() => {
      this._elapsedTime = Time.now().sub(this._lastStartTime).add(elapsedTimeAtStart);

      if (this._onIntervalCallback) {
        this._onIntervalCallback(this.elapsedTime);
      }
    }, this._interval);
  }

  public stop() {
    if (this.isActive) {
      window.clearInterval(this._cancellationToken);
      this._cancellationToken = 0;
    }
  }

  // #endregion Public Methods (2)
}
