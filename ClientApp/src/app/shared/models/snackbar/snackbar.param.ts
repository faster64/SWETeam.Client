export class SnackBarParameter {
  public sender: any;
  public message: string = "";
  public actionText: string = "Đóng";
  public duration: number = 3000;
  public afterDismissedCallback!: Function;
  public afterOpenedCallback!: Function;

  constructor(
    sender: any = undefined,
    message: string = "",
    actionText: string = "Đóng",
    duration: number = 3000,
    afterDismissedCallback: Function = function() {},
    afterOpenedCallback: Function  = function() {}
  ) {
    this.sender = sender;
    this.message = message;
    this.actionText = actionText;
    this.duration = duration;
    this.afterDismissedCallback = afterDismissedCallback;
    this.afterOpenedCallback = afterOpenedCallback;
  }
}

export enum SnackBarType {
  Success = 1,
  Warning = 2,
  Danger = 3,
}
