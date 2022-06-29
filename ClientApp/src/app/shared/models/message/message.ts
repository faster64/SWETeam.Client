/**
 * Đối tượng để gửi dữ liệu (thường dùng với callback)
 */
 export class Message {
  public sender: any;
  public data: any;
  public callback!: Function;

  constructor(sender: any = null, data: any = null, callback: Function = () => {}) {
    this.sender = sender;
    this.data = data;
    this.callback = callback;
  }
}
