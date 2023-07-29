import { Component } from '@angular/core';
import { Log } from '../store/logs.model';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent {

  logs: Log[] = [];

  ngOnInit() {
    const logsData = localStorage.getItem('__logs__');
    this.logs = logsData ? JSON.parse(logsData) : [];
  }

}
