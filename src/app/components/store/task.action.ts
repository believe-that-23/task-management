import { Action, createAction, props } from "@ngrx/store";
import { Task } from "./task.module";

export const ADD_TASK = 'ADD_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const DELETE_TASK = 'DELETE_TASK';

export const addTask = createAction(ADD_TASK, props<{task:Task}>());
export const updateTask = createAction(UPDATE_TASK, props<{task:Task}>());
export const deleteTask = createAction(DELETE_TASK, props<{task:Task}>());

