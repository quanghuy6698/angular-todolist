import { Component, Input } from '@angular/core';

@Component({
  selector: 'form-msg-cmp',
  templateUrl: './form-msg.cmp.html',
  styleUrls: ['./form-msg.cmp.css'],
})
export class FormMsgCmp {
  @Input('type') type: string = 'success';
  @Input('msg') msg: string = '';
  isShowMsg: boolean = false;

  constructor() {}

  /**
   * Show form message
   *
   */
  showMsg() {
    this.isShowMsg = true;
  }

  /**
   * Clear form message
   *
   */
  clearMsg() {
    this.msg = '';
    this.isShowMsg = false;
  }
}
