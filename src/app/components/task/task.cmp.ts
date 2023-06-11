import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CHECKED_ICON, UNCHECKED_ICON } from 'src/app/constants/icons.constants';
import { TaskDisplayModel } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'task-cmp',
  templateUrl: './task.cmp.html',
  styleUrls: ['./task.cmp.css'],
})
export class TaskCmp {
  @Input('task') task: TaskDisplayModel = {
    key: '',
    name: '',
    description: '',
    dueDate: '',
    priority: 'normal',
    isChecked: false,
    isShow: true,
  };
  @Output('notifyChecked') notifyChecked = new EventEmitter<{ key: string; isChecked: boolean }>();
  isShowEditForm: boolean = false;

  constructor(private taskSvc: TaskService) {}

  /**
   * @returns checked icon url if task is checked, else return unchecked icon url
   */
  getCheckIconUrl(): string {
    if (this.task.isChecked) {
      return CHECKED_ICON;
    }
    return UNCHECKED_ICON;
  }

  /**
   * Set task to checked/unchecked.
   */
  onCheckTask() {
    this.task.isChecked = !this.task.isChecked;
    this.notifyChecked.emit({
      key: this.task.key,
      isChecked: this.task.isChecked,
    });
  }

  /**
   * Show/Hide edit form.
   */
  onClickDetailBtn() {
    this.isShowEditForm = !this.isShowEditForm;
  }

  /**
   * Remove this task from local storage.
   * Notify the change.
   */
  onClickRemoveBtn() {
    this.taskSvc.removeTask(this.task.key);
    this.taskSvc.notifyTaskListChange();
  }
}
