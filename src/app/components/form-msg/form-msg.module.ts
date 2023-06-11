import { NgModule } from '@angular/core';
import { FormMsgCmp } from './form-msg.cmp';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [FormMsgCmp],
  exports: [FormMsgCmp],
})
export class FormMsgCmpModule {}
