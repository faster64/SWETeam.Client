import { ErrorCode } from "../../enumerations/error-code.enum";

export class ValidateField {
  public FieldName: string = "";

  public Code!: ErrorCode;

  public ErrorMessage: string = "";
}
