import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as uuid from 'uuid';

import { addTask } from '../store/task.action';
import { Task } from 'src/app/components/store/task.module';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {

  task = '';
  description = '';
  dueDate = '';
  priority = ['low', 'medium', 'high'];

  data = {
    task: '',
    description: '',
    dueDate: '',
    priority: ''
  };

  constructor(private store: Store<{taskList: {tasks: Task[]} }>) {}


  onSubmit(form: NgForm) {
    
    const value = form.value;
    const newId = uuid.v4();
    console.log(value.dueDate);
    const newTask = new Task(newId, value.task, value.description, value.dueDate, value.priority, '-')
    this.store.dispatch(addTask({ task: newTask }));
    form.reset();
  }

}
