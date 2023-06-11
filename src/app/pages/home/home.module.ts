import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomePage } from './home.page';
import { TaskInputFormCmpModule } from 'src/app/components/task-input-form/task-input-form.module';
import { TodoListCmpModule } from 'src/app/components/todo-list/todo-list.module';

const routes = [
  {
    path: '',
    component: HomePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), TaskInputFormCmpModule, TodoListCmpModule],
  declarations: [HomePage],
  exports: [HomePage],
})
export class HomePageModule {}
