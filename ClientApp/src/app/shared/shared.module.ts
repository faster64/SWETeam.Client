import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SWETeamLoadingModule } from "./components/common-loading/swe-team-loading.module";
import { HeaderModule } from "./components/header/header.module";
import { CountDownPipe } from "./pipes/count-down.pipe";
import { DateVietnamPipe } from "./pipes/date.pipe";
@NgModule({
  declarations: [
    DateVietnamPipe,
    CountDownPipe,
  ],
  imports: [
    CommonModule,
    SWETeamLoadingModule,
    HeaderModule,
  ],
  exports: [
    SWETeamLoadingModule,
    HeaderModule,
    DateVietnamPipe,
    CountDownPipe,
  ]
})
export class SharedModule { }
