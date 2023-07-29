import { Component } from '@angular/core';
import { Task } from '../store/task.module';
import { OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';
import { deleteTask, updateTask } from '../store/task.action';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  displayStyle = "none";

  tasks: Task[] = [];
  constructor(private store: Store<{ taskList: { tasks: Task[] } }>) { }

  ngOnInit() {
    this.store.select(state => state.taskList.tasks).subscribe(tasks => {
      this.tasks = tasks;
    });
  }


  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

  handleDelete(task: Task) {
    this.store.dispatch(deleteTask({ task: task }));
  }

  onSubmit(form: NgForm, id: string) {
    const value = form.value;
    const newTask = new Task(id, value.task, value.description, value.dueDate, value.priority, value.status);
    this.store.dispatch(updateTask({ task: newTask }));
  }

  sortTasks(event: Event): void {
    const sortBy = (event.target as HTMLSelectElement).value;
    const sortedTasks = [...this.tasks];

    switch (sortBy) {
      case 'task':
        sortedTasks.sort((a, b) => a.task.localeCompare(b.task));
        break;
      case 'priority':
        sortedTasks.sort((a, b) => a.priority.localeCompare(b.priority));
        break;
      case 'dueDate':
        sortedTasks.sort((a, b) => a.dueDate.localeCompare(b.dueDate));
        break;
      case 'status':
        sortedTasks.sort((a, b) => a.status.localeCompare(b.status));
        break;
    }

    this.tasks = sortedTasks; 
  }
}
