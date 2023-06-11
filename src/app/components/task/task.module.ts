import { NgModule } from '@angular/core';
import { TaskCmp } from './task.cmp';
import { TaskInputFormCmpModule } from '../task-input-form/task-input-form.module';

@NgModule({
  imports: [TaskInputFormCmpModule],
  declarations: [TaskCmp],
  exports: [TaskCmp],
})
export class TaskCmpModule {}
