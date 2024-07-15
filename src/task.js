export class Task {
    constructor(name) {
        this.name = name;
    }
}

export class TaskOperations {
    addTask(task) { }
    deleteTask(task) { }
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

    getTask() {
        return [...this.tasks];
    }

}

export class CreateTask {
    createTask(name) {
        return new Task(name);
    }
}

export function displayTasks(taskList) {
    const tasks = taskList.getTask();
    if (tasks.length === 0) {
        console.log("No task in the list");

    } else {
        console.log("Current task:");
        tasks.forEach((task, index) => {
            console.log(`${index + 1}. ${task.name}`);
        });
    }
    console.log();

}