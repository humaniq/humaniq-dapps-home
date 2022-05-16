class Logcat {
  static log(...args: any[]) {
    console.log(...args);
  }

  static debug(...args: any[]) {
    console.debug(...args);
  }

  static error(msg: any, err: any, ...optionalParams: any[]) {
    console.error(msg, err);
  }

  static info(...args: any[]) {
    console.info(...args);
  }

  static warning(msg: any, ...optionalParams: any[]) {
    console.warn(msg);
  }
}

export default Logcat;
