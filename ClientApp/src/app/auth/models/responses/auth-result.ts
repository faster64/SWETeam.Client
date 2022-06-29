import { ValidateField } from "src/app/shared/models/base/validate-field";
import { BaseResponse } from "./base-response";

export class AuthResult extends BaseResponse {

  /// Access token
  public AccessToken: string = "";

  /// Refresh Token
  public RefreshToken: string = "";

  /// OTP
  public OTP: string = "";



  /// Thông tin validate
  public ValidateInfo! : ValidateField[];
}
