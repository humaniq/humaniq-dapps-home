class Logcat {
  static log(msg: any, ...optionalParams: any[]) {
    console.log(msg);
  }

  static debug(msg: any, ...optionalParams: any[]) {
    console.debug(msg);
  }

  static error(msg: any, err: any, ...optionalParams: any[]) {
    console.error(msg, err);
  }

  static info(msg: any, ...optionalParams: any[]) {
    console.info(msg);
  }

  static warning(msg: any, ...optionalParams: any[]) {
    console.warn(msg);
  }
}

export default Logcat;
