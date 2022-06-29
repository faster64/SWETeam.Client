interface String {
  /**
   * Return true if null or empty, otherwise false.
   */
  isNullOrEmpty(): boolean;

  /**
   * Return true if null or white space, otherwise false.
   */
  isNullOrWhiteSpace(): boolean;

  /**
   * Return true if value is valid mail, otherwise false.
   */
  isMail(): boolean;
}

/**
 * Return true if null or empty, otherwise false.
 */
String.prototype.isNullOrEmpty = function () {
  if (!this || (this as string).length === 0) {
    return true;
  }
  return false;
}

/**
 * Return true if null or white space, otherwise false.
 */
String.prototype.isNullOrWhiteSpace= function () {
  if (!this || (this as string).trim().length === 0) {
    return true;
  }
  return false;
}

/**
 * Return true if value is valid mail, otherwise false.
 */
String.prototype.isMail = function () {
  if (this.isNullOrEmpty())
    return false;

  const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return re.test(this.toLocaleLowerCase());
}
