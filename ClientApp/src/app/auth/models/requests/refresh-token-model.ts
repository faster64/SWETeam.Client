import { CommonConstant } from "src/app/shared/constants/common.constant";
import { BaseModel } from "src/app/shared/models/base/base-model";

export class RefreshTokenModel extends BaseModel
{
    public UserId = CommonConstant.ZERO_GUID;

    public RefreshToken = "";

    public ExpriedTime!: Date;
}
