import { Component, OnInit } from '@angular/core';
import { Log } from '../../models/Log';
import { LogService } from '../../services/log.service';


@Component({
  selector: 'app-logs-form',
  templateUrl: './logs-form.component.html',
  styleUrls: ['./logs-form.component.css']
})
export class LogsFormComponent implements OnInit {

  id: string;
  text: string;
  date: any;

  isNew = true;

  constructor(private logService: LogService) { }

  ngOnInit() {
    // subscride to the selectedLog obsevalble
    this.logService.selectedLog.subscribe( log => {
      if ( log.id !== null) {
        this.isNew = false;
        this.id = log.id;
        this.text = log.text;
        this.date = log.date;
      }
    });
  }

  onSubmit() {
    // check if new log
    if (this.isNew) {
      const newLog = {
        id: this.generateId(),
        text: this.text,
        date: new Date()
      };
      this.logService.addLog(newLog);
    } else {
      // create a log to be updated
      const updLog = {
        id: this.id,
        text: this.text,
        date: new Date()
      };
      this.logService.updateLog(updLog);
    }

    this.clearState();
  }

  clearState() {
    this.isNew = true;
    this.id = null;
    this.text = null;
    this.date = null;
    this.logService.clearState();
  }

  generateId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    // const v = require('uuid/v1');
    // return '5';
  }

}
