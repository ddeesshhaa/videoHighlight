class apiError {
  constructor(code, msg) {
    this.code = code;
    this.msg = msg;
  }
  static er(code, msg) {
    return new apiError(code, msg);
  }

  static badReq(msg) {
    return new apiError(400, msg);
  }
  static intErr(msg) {
    return new apiError(500, msg);
  }
}

module.exports = apiError;
