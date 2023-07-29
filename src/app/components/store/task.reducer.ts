import { Task } from "./task.module";
import {addTask, updateTask, deleteTask} from './task.action'
import { createReducer, on } from "@ngrx/store";


export interface State {
    tasks: Task[];
}

const initialState: State = {
    tasks: [new Task('asdfasdf','a', 'ab', 'asdf', 'asg', 'asdf')]
}
const localStorageTasks = localStorage.getItem('__data__');
if (localStorageTasks) {
  initialState.tasks = JSON.parse(localStorageTasks);
}

export const appReducer = createReducer(
    initialState,
    on(addTask, (state, { task }) => {
      return { ...state, tasks: [...state.tasks, task] };
    }),
    on(updateTask, (state, { task }) => ({
        ...state,
        tasks: state.tasks.map((t) => (t.id === task.id ? { ...task } : t)),
      })),
      on(deleteTask, (state, { task }) => ({
        ...state,
        tasks: state.tasks.filter((t) => t.id !== task.id),
      }))
);