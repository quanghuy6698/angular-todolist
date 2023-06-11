import { Component } from '@angular/core';
import { ITaskModel, TaskDisplayModel } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'todo-list-cmp',
  templateUrl: './todo-list.cmp.html',
  styleUrls: ['./todo-list.cmp.css'],
})
export class TodoListCmp {
  public taskLst: ITaskModel[] = [];
  public taskLstDisplay: Map<string, TaskDisplayModel> = new Map();
  public isShowBulkAction: boolean = false;
  public txtSearch = '';

  constructor(private taskSvc: TaskService) {
    this.getTaskList();
    this.resetTaskListDisplay();
    this.subscribeTaskListChange();
  }

  /**
   * Get task list from local storage
   *
   */
  getTaskList() {
    this.taskLst = this.taskSvc.getTaskList();
  }

  /**
   * Reset state of task list display map.
   * Keep checked/show state of task which is not removed.
   */
  resetTaskListDisplay() {
    let newTaskLstDisplay: Map<string, TaskDisplayModel> = new Map();

    this.taskLst.forEach((task) => {
      newTaskLstDisplay.set(task.key, this.convertTaskToDisplayObj(task));
    });

    this.taskLstDisplay.forEach((task) => {
      let newTaskDisplay = newTaskLstDisplay.get(task.key);
      if (newTaskDisplay) {
        newTaskDisplay!.isChecked = task.isChecked;
        newTaskDisplay!.isShow = task.isShow;
      }
    });

    this.taskLstDisplay = newTaskLstDisplay;
  }

  /**
   * Subscribe to change of task list in local storage
   *
   */
  subscribeTaskListChange() {
    this.taskSvc.bsTaskLstChange.subscribe((isChanged) => {
      if (isChanged) {
        this.getTaskList();
        this.resetTaskListDisplay();
        this.taskSvc.resetNotifyTaskListChange();
      }
    });
  }

  /**
   * On select a task
   *
   */
  onSelectTask(notifyObj: any) {
    this.taskLstDisplay.get(notifyObj.key)!.isChecked = notifyObj.isChecked;
    this.checkShowBulkAction();
  }

  /**
   * Check if one or more tasks in the task list is selected, then show the bulk action
   *
   */
  checkShowBulkAction() {
    for (let [key, value] of this.taskLstDisplay) {
      if (value.isChecked) {
        this.isShowBulkAction = true;
        return;
      }
    }
    this.isShowBulkAction = false;
  }

  /**
   * Remove a task from task list.
   * Reload task list.
   *
   */
  onClickRemoveBtn() {
    let removeKeyArr: string[] = [];
    this.taskLstDisplay.forEach((task) => {
      if (task.isChecked) {
        removeKeyArr.push(task.key);
      }
    });

    for (let key of removeKeyArr) {
      this.taskSvc.removeTask(key);
    }

    this.getTaskList();
    this.resetTaskListDisplay();
  }

  /**
   * Every time the user types, search all the tasks in the list with the matching title
   *
   */
  onSearchTask() {
    if (this.txtSearch) {
      this.taskLstDisplay.forEach((task) => {
        if (!task.name.includes(this.txtSearch)) {
          task.isShow = false;
        }
      });
    } else {
      this.taskLstDisplay.forEach((task) => {
        task.isShow = true;
      });
    }
  }

  /**
   * Convert task object to display object
   */
  convertTaskToDisplayObj(task: ITaskModel): TaskDisplayModel {
    return new TaskDisplayModel(task.key, task.name, task.description, task.dueDate, task.priority, false, true);
  }
}
