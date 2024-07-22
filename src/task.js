export class Task {
    constructor(name, description = '', dueDate = null, priority = 'medium') {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
        this.project = null;
    }
    setProject(project) {
        this.project = project;
    }
    setCompleted(status) {
        this.completed = status;
    }
}

export class TaskOperations {
    addTask(task) { }
    deleteTask(task) { }
    renameTask(task) { }
    getTask() { }
}

export class TaskList extends TaskOperations {

    constructor() {
        super();
        this.tasks = [];
    }

    addTask(task) {
        if (task instanceof Task) {
            this.tasks.push(task);
        } else {
            throw new Error("Can only add Tasks Objects");
        }
    }

    deleteTask(task) {
        const index = this.tasks.indexOf(task);
        if (index > -1) {
            this.tasks.splice(index, 1);
        }
    }

    renameTask(task) {
        const newTaskName = task;

    }

    getTask() {
        return [...this.tasks];
    }

    displayDetailedTasks() {
        this.tasks.forEach((task, index) => {
            console.log(`${index + 1}. ${task.name} - Priority: ${task.priority}`);
            console.log(`Description: ${task.description}`);
            console.log(`Due Date: ${task.dueDate ? task.dueDate.toDateString() : "Not Set"}`);
            console.log(`Status: ${task.completed ? "Completed" : "Pending"}`);
        })
    }

}

export class CreateTask {
    createTask(name, description = '', dueDate = null, priority = 'medium') {
        return new Task(name, description, dueDate, priority);
    }
}

export function displayTasks(taskList) {
    const tasks = taskList.getTask();
    if (tasks.length === 0) {
        console.log("No tasks in the list");
    } else {
        console.log("Current tasks:");
        tasks.forEach((task, index) => {
            console.log(`${index + 1}. ${task.name} 
            - Priority: ${task.priority}
             - Due: ${task.dueDate ? task.dueDate.toDateString() : 'Not set'} 
             - Project: ${task.project ? task.project.name : 'No project'}`);
        });
    }
    console.log();
}