import { EntityState } from "../../enumerations/common.enum";

export class BaseModel {
  public CreatedDate: Date = new Date();

  public CreatedBy: string = "";

  public ModifiedDate: Date = new Date();

  public ModifiedBy: string = "";

  public EntityState: number = EntityState.Add;

  public IsDeleted: boolean = false;

  constructor(obj?: object) {
    if(obj) {
      setTimeout( () => {
        Object.assign(this, obj);
      }, 0);
    }
  }
}
