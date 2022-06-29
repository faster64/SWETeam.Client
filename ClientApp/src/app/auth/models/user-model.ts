import { CommonConstant } from "src/app/shared/constants/common.constant";
import { GenderType } from "src/app/shared/enumerations/common.enum";

export class User {
  public Id: string = CommonConstant.ZERO_GUID;

  /// Số điện thoại
  public PhoneNumber: string = "";

  /// Email
  public Email: string = "";

  /// First name
  public FirstName: string = "";

  /// Lastname
  public LastName: string = "";

  /// Mật khẩu
  public Password: string = "";

  /// Fullname
  public FullName: string = "";

  /// Địa chỉ
  public Address: string = "";

  /// Ngày sinh
  public DateOfBirth: Date = new Date();

  /// Giới tính.0 - Nam, 1 - Nữ, 2 - Khác
  public Gender!: number;

  /// Đã Verify hay chưa?
  public IsVerified: boolean = false;

  /// Đã verify phone hay chưa?
  public IsPhoneVerified: boolean = false;
}
