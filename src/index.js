// index.js
import { TaskList, CreateTask, displayTasks } from './task.js';
import { ProjectList, CreateProject, displayProject } from './project.js';
import './styles.css';

// Create global lists
const projectList = new ProjectList();
const taskList = new TaskList();

// Create factories
const createNewProject = new CreateProject();
const createNewTask = new CreateTask();

// Create default project
const defaultProject = createNewProject.createProject("My Project");
projectList.addProject(defaultProject);

// Function to add a task
function addTask(name, description = '', dueDate = null, priority = 'medium') {
    const task = createNewTask.createTask(name, description, dueDate, priority);
    taskList.addTask(task);
    defaultProject.addTask(task);
    return task;
}

// Example usage
const codingTask = addTask('Sleep', 'Always sleep', new Date(2024, 6, 30), "high");
const reviewTask = addTask("Review Now");

// Display tasks
console.log("Tasks in My Project:");
defaultProject.getTasks().forEach(task => {
    console.log(`- ${task.name}`);
});

console.log("\nAll tasks:");
displayTasks(taskList);

// Display projects
displayProject(projectList);

