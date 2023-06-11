import { Injectable } from '@angular/core';
import { ITaskModel } from '../models/task.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  public bsTaskLstChange = new BehaviorSubject(false);

  getTaskList(): ITaskModel[] {
    let taskLst = localStorage.getItem('taskLst');
    if (taskLst) {
      let doTaskLst = JSON.parse(taskLst);
      this.sortTaskListByDueDate(doTaskLst);
      return doTaskLst;
    } else {
      return [];
    }
  }

  addNewTask(task: ITaskModel) {
    let doTaskLst = [];
    let taskLst = localStorage.getItem('taskLst');
    if (taskLst) {
      doTaskLst = JSON.parse(taskLst);
      doTaskLst.push(task);
    } else {
      doTaskLst = [];
      doTaskLst.push(task);
    }

    this.sortTaskListByDueDate(doTaskLst);
    localStorage.setItem('taskLst', JSON.stringify(doTaskLst));
  }

  updateTask(task: ITaskModel, key: string) {
    let taskLst = localStorage.getItem('taskLst');
    if (taskLst) {
      let doTaskLst = JSON.parse(taskLst);
      let updateIndex = this.findIndexByTaskKey(doTaskLst, key);
      doTaskLst[updateIndex] = task;
      this.sortTaskListByDueDate(doTaskLst);
      localStorage.setItem('taskLst', JSON.stringify(doTaskLst));
    }
  }

  removeTask(key: string) {
    let taskLst = localStorage.getItem('taskLst');
    if (taskLst) {
      let doTaskLst = JSON.parse(taskLst);
      let removeIndex = this.findIndexByTaskKey(doTaskLst, key);
      doTaskLst.splice(removeIndex, 1);
      this.sortTaskListByDueDate(doTaskLst);
      localStorage.setItem('taskLst', JSON.stringify(doTaskLst));
    }
  }

  findIndexByTaskKey(taskLst: ITaskModel[], key: string): number {
    for (let task of taskLst) {
      if (task.key == key) {
        return taskLst.indexOf(task);
      }
    }
    return -1;
  }

  sortTaskListByDueDate(taskLst: ITaskModel[]) {
    taskLst.sort((task1, task2) => {
      if (task1.dueDate < task2.dueDate) {
        return -1;
      }
      if (task1.dueDate > task2.dueDate) {
        return 1;
      }
      return 0;
    });
  }

  notifyTaskListChange() {
    this.bsTaskLstChange.next(true);
  }

  resetNotifyTaskListChange() {
    this.bsTaskLstChange.next(false);
  }
}
