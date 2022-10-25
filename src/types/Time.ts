export default class Time {
  private timeInMs: number;

  constructor(initial: number | string = 0) {
    if (typeof initial === "number") {
      this.timeInMs = initial;
    } else {
      const parts = initial.split(":");

      const hours = parts.length > 0 ? parseInt(parts[0], 10) : 0;
      const minutes = parts.length > 1 ? parseInt(parts[1], 10) : 0;
      const seconds = parts.length > 2 ? parseInt(parts[2], 10) : 0;

      this.timeInMs = hours * 3600000 + minutes * 60000 + seconds * 1000;
    }
  }

  public get timeInMilliseconds() {
    return this.timeInMs;
  }

  public add(other: Time): Time {
    return new Time(this.timeInMs + other.timeInMilliseconds);
  }

  public sub(other: Time): Time {
    return new Time(this.timeInMs - other.timeInMilliseconds);
  }

  public toString(format = "hh:mm:ss.SSS") {
    const hours = ("00" + Math.floor(this.timeInMs / 3600000).toFixed(0)).slice(-2);
    const minutes = ("00" + Math.floor((this.timeInMs % 3600000) / 60000).toFixed(0)).slice(-2);
    const seconds = ("00" + Math.floor(((this.timeInMs % 3600000) % 60000) / 1000).toFixed(0)).slice(-2);
    const millisecs = ("000" + Math.floor(((this.timeInMs % 3600000) % 60000) % 1000).toFixed(0)).slice(-3);

    let formatted = format.replace("hh", hours);
    formatted = formatted.replace("mm", minutes);
    formatted = formatted.replace("ss", seconds);
    formatted = formatted.replace("S", millisecs.substring(0, 1));
    formatted = formatted.replace("S", millisecs.substring(1, 2));
    formatted = formatted.replace("S", millisecs.substring(2, 3));

    return formatted;
  }

  public static now(): Time {
    const d = new Date();
    const d2 = new Date();
    d2.setUTCHours(0);
    d2.setUTCMinutes(0);
    d2.setUTCSeconds(0);
    d2.setUTCMilliseconds(0);

    const tzOffset = d.getTimezoneOffset() * 60000; // Time-zone offset in ms

    return new Time(d.getTime() - d2.getTime() - tzOffset);
  }
}
