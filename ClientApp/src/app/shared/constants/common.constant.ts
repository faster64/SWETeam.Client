export class CommonConstant {
  public static readonly ZERO_GUID  = "00000000-0000-0000-0000-000000000000";
}

export class ErrorMessageConstant {
  public static readonly HAS_ERROR_MESSAGE = 'Đã xảy ra lỗi. Vui lòng thử lại sau!';
  public static readonly SESSION_EXPRIED = 'Phiên đăng nhập đã hết hạn';
  public static readonly ACCOUNT_NOT_VERIFIED = 'Tài khoản của bạn chưa được xác minh. Vui lòng xác minh tài khoản!';
}

export class PerrmisionConstant {
  public static readonly NOT_PERMISSION = 'Bạn không có quyền thực hiện chức năng này!';
  public static readonly UNDERSTOOD = 'Đã hiểu';
  public static readonly OK = 'OK!';

}

/**
 * Danh sách routing
 */
export class Routing {
  public static readonly NOT_FOUND = 'not-found';
  public static readonly ACCESS_DENIED = 'access-denied';
  public static readonly LOGIN = 'login';
  public static readonly REGISTER = 'register';
  public static readonly VERIFY = 'verify';
  public static readonly VERIFY_REGISTER = 'auth/verify-register';
  public static readonly VERIFY_LOGIN = 'auth/verify-login';
  public static readonly DASHBOARD = 'dashboard';
  public static readonly CONTACT = 'contact';
}
