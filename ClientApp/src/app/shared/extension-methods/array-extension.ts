interface Array<T> {

  /**
   * Loại bỏ reference
   * CreatedBy: nvcuong (11/06/2022)
   */
  removeRef(): Array<T>;

  /**
   * Loại bỏ null, undefined
   * CreatedBy: nvcuong (11/06/2022)
   */
  cleanArray(): void
}

Array.prototype.removeRef = function () {
  return JSON.parse(JSON.stringify(this));
}

Array.prototype.cleanArray = function () {
  return this.filter(item => item !== null && item !== undefined);
}
