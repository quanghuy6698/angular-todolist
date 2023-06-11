import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TaskInputFormCmp } from './task-input-form.cmp';
import { FormMsgCmpModule } from '../form-msg/form-msg.module';

@NgModule({
  imports: [FormsModule, ReactiveFormsModule, FormMsgCmpModule],
  declarations: [TaskInputFormCmp],
  exports: [TaskInputFormCmp],
})
export class TaskInputFormCmpModule {}
