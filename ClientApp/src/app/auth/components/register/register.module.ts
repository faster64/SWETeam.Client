import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { SWETeamButtonModule } from '../../../shared/components/button/swe-team-button.module';
import { TranslateModule } from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    SWETeamButtonModule,
    TranslateModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatRadioModule,
    MatCheckboxModule
  ]
})
export class RegisterModule { }
