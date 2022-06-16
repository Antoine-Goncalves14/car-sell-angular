import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { EditAuthInfoComponent } from './edit-auth-info/edit-auth-info.component';


@NgModule({
  declarations: [
    AccountComponent,
    EditProfileComponent,
    EditAuthInfoComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
