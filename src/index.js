import { Task, TaskOperations, TaskList, CreateTask, displayTasks } from './task.js';

const taskList = new TaskList();
const createNewTask = new CreateTask();

const codingTask = createNewTask.createTask(
    'Sleep',
    'Always sleep',
    new Date(2024, 6, 30),
    "high asf"
);

taskList.addTask(codingTask);

taskList.displayDetailedTasks();


const reviewTask = createNewTask.createTask("Review Now");
taskList.addTask(reviewTask);
displayTasks(taskList);


reviewTask.setCompleted(true);

console.log("After updates:");
taskList.displayDetailedTasks();