import { Task, TaskOperations, TaskList, CreateTask, displayTasks } from './task.js';

const taskList = new TaskList();
const createNewTask = new CreateTask();

displayTasks(taskList);

const newTask = createNewTask.createTask("Code Now");
taskList.addTask(newTask);
displayTasks(taskList);

const oldTask = createNewTask.createTask("Code Yesterday");
taskList.addTask(oldTask);
displayTasks(taskList);

taskList.deleteTask(oldTask);

displayTasks(taskList);