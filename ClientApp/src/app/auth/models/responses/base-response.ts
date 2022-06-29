export class BaseResponse {
  /// Http status code trả về
  public Code: number = 200;

  // Success
  public Success = true;

  // Message
  public Message: string = "";

  /// Time hệ thống
  public ServerTime!: Date;

  /// Error message
  public ErrorMessage: string = "";
}
