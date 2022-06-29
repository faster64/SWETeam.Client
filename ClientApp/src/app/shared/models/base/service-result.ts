import { HttpStatusCode } from "@angular/common/http";
import { ValidateField } from "./validate-field";

export class ServiceResult {
  public Code: number = HttpStatusCode.Ok;

  public Data: any;

  public Success: boolean = true;

  public Message: string = "";

  public ValidateInfo!: ValidateField[];

  public ServerTime: Date = new Date();

  public HasPermission: boolean = true;

  public Total: number = 0;

  public ErrorMessage: string = "";
}
