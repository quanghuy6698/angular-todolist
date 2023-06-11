import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TASK_INPUT_FORM } from 'src/app/constants/forms.constants';
import { TASK_KEY_PREFIX } from 'src/app/constants/local-storage.constants';
import {
  MESSAGE_TYPES,
  TASK_ADDED_SUCCESS_MSG,
  TASK_DUE_DATE_IN_PAST_MSG,
  TASK_NAME_REQUIRED_MSG,
  TASK_UPDATED_SUCCESS_MSG,
} from 'src/app/constants/messages.constants';
import { ITaskModel } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'task-input-form-cmp',
  templateUrl: './task-input-form.cmp.html',
  styleUrls: ['./task-input-form.cmp.css'],
})
export class TaskInputFormCmp implements OnInit {
  @Input('mode') mode: string = 'create';
  @Input('task') task: ITaskModel = {
    key: '',
    name: '',
    description: '',
    dueDate: new Date().toISOString().split('T')[0],
    priority: 'normal',
  };
  @Output('notifyUpdate') notifyUpdate = new EventEmitter<ITaskModel>();
  taskInputForm = this.formBuilder.group({
    [TASK_INPUT_FORM.NAME]: '',
    [TASK_INPUT_FORM.DESCRIPTION]: '',
    [TASK_INPUT_FORM.DUE_DATE]: '',
    [TASK_INPUT_FORM.PRIORITY]: 'normal',
  });
  isShowFormMsg: boolean = false;
  formMsg: string = '';
  formMsgType: string = '';

  constructor(private formBuilder: FormBuilder, private taskSvc: TaskService) {}

  ngOnInit() {
    this.setFormValues(this.task);
  }

  /**
   *
   * @returns placeholder of name input base on form mode
   */
  getNameInputPlaceholder() {
    if (this.mode == 'create') {
      return 'Add new task...';
    }
    return '';
  }

  /**
   *
   * @returns label of submit button base on form mode
   */
  getSubmitBtnLabel(): string {
    if (this.mode == 'create') {
      return 'Add';
    }
    return 'Update';
  }

  /**
   * Set values to form
   *
   * @param task: Task object to set values to form
   */
  setFormValues(task: ITaskModel) {
    this.taskInputForm.controls[TASK_INPUT_FORM.NAME].setValue(task.name);
    this.taskInputForm.controls[TASK_INPUT_FORM.DESCRIPTION].setValue(task.description);
    this.taskInputForm.controls[TASK_INPUT_FORM.DUE_DATE].setValue(task.dueDate);
    this.taskInputForm.controls[TASK_INPUT_FORM.PRIORITY].setValue(task.priority);
  }

  /**
   * Submit the form
   *
   */
  onClickSubmitBtn() {
    let errMsg = this.validateFormValues();
    if (errMsg) {
      this.showFormMsg(MESSAGE_TYPES.ERROR, errMsg);
      return;
    }

    this.clearFormMsg();

    if (this.mode == 'create') {
      this.addNewTask();
    } else {
      this.updateTask();
    }
  }

  /**
   * Validate form values
   *
   * @return error message
   */
  validateFormValues(): string {
    // Required task name
    if (!this.taskInputForm.controls[TASK_INPUT_FORM.NAME].value) {
      return TASK_NAME_REQUIRED_MSG;
    }

    // Due date must be greater than now
    let dueDate = this.taskInputForm.controls[TASK_INPUT_FORM.DUE_DATE].value;
    let doDueDate = new Date(dueDate);
    doDueDate.setHours(0, 0, 0, 0);
    let nowDate = new Date();
    nowDate.setHours(0, 0, 0, 0);
    if (doDueDate < nowDate) {
      return TASK_DUE_DATE_IN_PAST_MSG;
    }

    return '';
  }

  /**
   * Create new task by form values.
   * Save to local storage.
   * Notify the change.
   */
  addNewTask() {
    let task = this.formValuesToTaskObj();
    this.taskSvc.addNewTask(task);
    this.showFormMsg(MESSAGE_TYPES.SUCCESS, TASK_ADDED_SUCCESS_MSG);
    setTimeout(() => {
      this.clearFormMsg();
    }, 3000);
    this.taskSvc.notifyTaskListChange();
  }

  /**
   * Update task by form values.
   * Save to local storage.
   * Notify the change.
   */
  updateTask() {
    let task = this.formValuesToTaskObj();
    this.taskSvc.updateTask(task, task.key);
    this.showFormMsg(MESSAGE_TYPES.SUCCESS, TASK_UPDATED_SUCCESS_MSG);
    setTimeout(() => {
      this.clearFormMsg();
    }, 3000);
    this.taskSvc.notifyTaskListChange();
  }

  /**
   * Create task object by form values
   *
   * @return task object
   */
  formValuesToTaskObj(): ITaskModel {
    let taskKey = '';
    if (this.task.key) {
      taskKey = this.task.key;
    } else {
      taskKey = String(TASK_KEY_PREFIX + Date.now());
    }

    let taskObj: ITaskModel = {
      key: taskKey,
      name: this.taskInputForm.controls[TASK_INPUT_FORM.NAME].value,
      description: this.taskInputForm.controls[TASK_INPUT_FORM.DESCRIPTION].value,
      dueDate: this.taskInputForm.controls[TASK_INPUT_FORM.DUE_DATE].value,
      priority: this.taskInputForm.controls[TASK_INPUT_FORM.PRIORITY].value,
    };
    return taskObj;
  }

  /**
   * Show form message
   *
   * @param type: type of message
   * @param msg: content of message
   */
  showFormMsg(type: string, msg: string) {
    this.formMsgType = type;
    this.formMsg = msg;
    this.isShowFormMsg = true;
  }

  /**
   * Clear form message
   *
   */
  clearFormMsg() {
    this.formMsgType = '';
    this.formMsg = '';
    this.isShowFormMsg = false;
  }
}
