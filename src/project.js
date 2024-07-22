export class Project {
    constructor(name) {
        this.name = name;
        this.tasks =[];
    }

    addTask(task){
        this.tasks.push(task);
        task.setProject(this);
    }

    deleteTask(task){
        const index = this.tasks.indexOf(task);
        if(index >-1) {
            this.tasks.splice(index , 1);
            tasks.setProject(null);
        }
    }

    getTasks() {
        return [...this.tasks];
    }

    displayTasks() {
        console.log(`Tasks in ${this.name}:`);
        this.tasks.forEach((task, index) => {
            console.log(`${index + 1}. ${task.name} - Priority: ${task.priority} - Due: ${task.dueDate ? task.dueDate.toDateString() : 'Not set'}`);
        });
    }
}


export class ProjectOperations {
    addProject(project) { }
    deleteProject(project) { }
    getProject() { }
}

export class ProjectList extends ProjectOperations {
    constructor() {
        super();
        this.projects = [];
    }

    addProject(project) {
        if (project instanceof Project) {
            this.projects.push(project);
        } else {
            throw new Error("Can only add Project Objects");
        }
    }

    deleteProject(project) {
        const index = this.projects.indexOf(project);
        if (index > -1) {
            this.projects.splice(index, 1);
        }
    }

    getProject() {
        return [...this.projects]
    }
}

export class CreateProject {
    createProject(name) {
        return new Project(name);
    }
}

export function displayProject(projectList) {
    const projects = projectList.getProject();
    if (projects.length == 0) {
        console.log("No current projects");
    } else {
        projects.forEach((project) => {
            console.log(`${project.name}`)
        })
    }
}