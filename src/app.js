import { format } from 'date-fns';
import Project from './project.js';
import Todo from './todo.js';
import './styles.css';

class TodoApp {
    constructor() {
        this.projects = [];
        this.currentProject = null;
    }

    init() {
        this.loadFromLocalStorage();

        if (this.projects.length === 0) {
            this.createDefaultProject();
        }

        this.currentProject = this.projects[0];
        this.render();
    }


    createDefaultProject() {
        const defaultProject = new Project('Default');
        this.projects.push(defaultProject);
    }

    createProject(name) {
        const project = new Project(name);
        this.projects.push(project);
        this.saveToLocalStorage();
    }

    createTodo(title, description, dueDate, priority, notes) {
        const todo = new Todo(title, description, dueDate, priority, notes)
        this.currentProject.addTodo(todo);
        this.saveToLocalStorage();
    }

    deleteTodo(todoIndex) {
        this.currentProject.removeTodo(todoIndex);
        this.saveToLocalStorage();
    }

    saveToLocalStorage() {
        localStorage.setItem('todoApp', JSON.stringify(this.projects));
    }

    loadFromLocalStorage() {
        const data = localStorage.getItem('todoApp');
        if (data) {
            this.projects = JSON.parse(data).map(project => {
                const p = new Project(project.name);
                p.todos = project.todos.map(todo => Object.assign(new Todo(), todo));
                return p;
            })
        }
    }


    render() {
        const wrapperDiv = document.createElement('div');
        wrapperDiv.id = 'wrapper';
        document.body.appendChild(wrapperDiv);
        
        const sidebarDiv = document.createElement('div');
        const addTaskButton = document.createElement('button');
        const projectsTitle = document.createElement('p');
    }


}

export default TodoApp;