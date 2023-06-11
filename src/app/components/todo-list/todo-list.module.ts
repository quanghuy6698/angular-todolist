import { NgModule } from '@angular/core';
import { TodoListCmp } from './todo-list.cmp';
import { TaskCmpModule } from '../task/task.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [TaskCmpModule, CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [TodoListCmp],
  exports: [TodoListCmp],
})
export class TodoListCmpModule {}
