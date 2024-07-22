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

    editTodo(todoIndex, updatedTodo) {
        Object.assign(this.currentProject.todos[todoIndex], updatedTodo);
        this.saveToLocalStorage();
        this.render();
    }




    render() {
        document.body.innerHTML = '';
        const wrapperDiv = document.createElement('div');
        wrapperDiv.id = 'wrapper';
        document.body.appendChild(wrapperDiv);

        const sidebarDiv = document.createElement('div');
        sidebarDiv.id = 'sidebar';
        wrapperDiv.appendChild(sidebarDiv);

        const addTaskButton = document.createElement('button');
        addTaskButton.id = 'add-task-btn';
        addTaskButton.textContent = 'Add task';
        addTaskButton.addEventListener('click', () => this.showAddTaskForm());
        sidebarDiv.appendChild(addTaskButton);

        const projectsTitle = document.createElement('p');
        projectsTitle.id = 'title';
        projectsTitle.textContent = 'My Projects';
        sidebarDiv.appendChild(projectsTitle);

        const projectList = document.createElement('ul');
        projectList.id = 'project-list';
        sidebarDiv.appendChild(projectList);

        this.projects.forEach((project, index) => {
            const projectItem = document.createElement('li');
            projectItem.textContent = project.name;
            projectItem.addEventListener('click', () => this.setCurrentProject(index));
            projectList.appendChild(projectItem);
        })

        const addProjectButton = document.createElement('button');
        addProjectButton.id = 'add-project-btn';
        addProjectButton.textContent = "New Project";
        addProjectButton.addEventListener('click', () => this.showAddProjectForm());
        sidebarDiv.appendChild(addProjectButton)

        const mainDiv = document.createElement('div');
        mainDiv.id = 'main';
        wrapperDiv.appendChild(mainDiv);

        const todoList = document.createElement('ul');
        todoList.id = 'todo-list';
        mainDiv.appendChild(todoList);

        this.currentProject.todos.forEach((todo, index) => {
            const todoItem = document.createElement('li');
            todoItem.textContent = `${todo.title} - Due: ${format(new Date(todo.dueDate), 'yyyy-MM-dd')}`;
            todoItem.addEventListener('click', () => this.showTodoDetails(index));
            todoList.appendChild(todoItem);
        })
    }

    showAddTaskForm() {
        const modalContainer = document.createElement('div');
        modalContainer.className = 'modal-container';
    
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
    
        const form = document.createElement('form');
        
        const title = document.createElement('h2');
        title.textContent = 'Add New Task';
        form.appendChild(title);
    
        const createFormElement = (labelText, inputType, inputId, isRequired = false) => {
            const label = document.createElement('label');
            label.setAttribute('for', inputId);
            label.textContent = labelText;
    
            const input = document.createElement(inputType === 'textarea' ? 'textarea' : 'input');
            input.id = inputId;
            if (inputType !== 'textarea') {
                input.type = inputType;
            }
            if (isRequired) {
                input.required = true;
            }
    
            form.appendChild(label);
            form.appendChild(input);
        };
    
        createFormElement('Title:', 'text', 'new-task-title', true);
        createFormElement('Description:', 'textarea', 'new-task-description');
        createFormElement('Due Date:', 'date', 'new-task-due-date', true);
    
        const priorityLabel = document.createElement('label');
        priorityLabel.setAttribute('for', 'new-task-priority');
        priorityLabel.textContent = 'Priority:';
        form.appendChild(priorityLabel);
    
        const prioritySelect = document.createElement('select');
        prioritySelect.id = 'new-task-priority';
        ['low', 'medium', 'high'].forEach(priority => {
            const option = document.createElement('option');
            option.value = priority;
            option.textContent = priority.charAt(0).toUpperCase() + priority.slice(1);
            prioritySelect.appendChild(option);
        });
        form.appendChild(prioritySelect);
    
        createFormElement('Notes:', 'textarea', 'new-task-notes');
    
        const buttonGroup = document.createElement('div');
        buttonGroup.className = 'button-group';
    
        const addButton = document.createElement('button');
        addButton.type = 'submit';
        addButton.textContent = 'Add Task';
        buttonGroup.appendChild(addButton);
    
        const cancelButton = document.createElement('button');
        cancelButton.type = 'button';
        cancelButton.textContent = 'Cancel';
        cancelButton.id = 'close-modal';
        buttonGroup.appendChild(cancelButton);
    
        form.appendChild(buttonGroup);
    
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('new-task-title').value;
            const description = document.getElementById('new-task-description').value;
            const dueDate = document.getElementById('new-task-due-date').value;
            const priority = document.getElementById('new-task-priority').value;
            const notes = document.getElementById('new-task-notes').value;
    
            this.createTodo(title, description, dueDate, priority, notes);
            modalContainer.remove();
            this.render();
        });
    
        cancelButton.addEventListener('click', () => {
            modalContainer.remove();
        });
    
        modalContent.appendChild(form);
        modalContainer.appendChild(modalContent);
        document.body.appendChild(modalContainer);
    }

    showAddProjectForm() {
        const modalContainer = document.createElement('div');
        modalContainer.className = 'modal-container';
    
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
    
        const form = document.createElement('form');
        
        const title = document.createElement('h2');
        title.textContent = 'Add New Project';
        form.appendChild(title);
    
        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.id = 'new-project-name';
        nameInput.placeholder = 'Project Name';
        nameInput.required = true;
        form.appendChild(nameInput);
    
        const buttonGroup = document.createElement('div');
        buttonGroup.className = 'button-group';
    
        const addButton = document.createElement('button');
        addButton.type = 'submit';
        addButton.textContent = 'Add Project';
        buttonGroup.appendChild(addButton);
    
        const cancelButton = document.createElement('button');
        cancelButton.type = 'button';
        cancelButton.textContent = 'Cancel';
        cancelButton.id = 'close-modal';
        buttonGroup.appendChild(cancelButton);
    
        form.appendChild(buttonGroup);
    
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const projectName = nameInput.value.trim();
            if (projectName) {
                this.createProject(projectName);
                modalContainer.remove();
                this.render();
            }
        });
    
        cancelButton.addEventListener('click', () => {
            modalContainer.remove();
        });
    
        modalContent.appendChild(form);
        modalContainer.appendChild(modalContent);
        document.body.appendChild(modalContainer);
    }

    setCurrentProject(index) {
        this.currentProject = this.projects[index];
        this.render();
    }

    showTodoDetails(todoIndex) {
        const todo = this.currentProject.todos[todoIndex];

        const modalContainer = document.createElement('div');
        modalContainer.className = 'modal-container';

        const modalContent = document.createElement('div');
        modalContent.className = "modal-content";

        const form = document.createElement('form');

        const title = document.createElement('h2');
        title.textContent = "Todo Details";
        form.appendChild(title);

        const createFormElement = (labelText, inputType, inputId, value) => {
            const label = document.createElement('label');
            label.setAttribute('for', inputId);
            label.textContent = labelText;

            const input = document.createElement(inputType === 'textarea' ? 'textarea' : 'input');
            input.id = inputId;
            if (inputType !== 'textarea') {
                input.type = inputType;
            }
            input.value = value;
            if (inputType === 'text' || inputType === 'date') {
                input.required = true;
            }
            form.appendChild(label);
            form.appendChild(input);
        };

        createFormElement('Title:', 'text', 'title', todo.title);
        createFormElement('Description:', 'textarea', 'description', todo.description);
        createFormElement('Due Date:', 'date', 'dueDate', format(new Date(todo.dueDate), 'yyyy-MM-dd'));

        const priorityLabel = document.createElement('label');
        priorityLabel.setAttribute('for', 'priority');
        priorityLabel.textContent = 'Priority:';
        form.appendChild(priorityLabel);

        const prioritySelect = document.createElement('select');
        prioritySelect.id = 'priority';
        ['low', 'medium', 'high'].forEach(priority => {
            const option = document.createElement('option');
            option.value = priority;
            option.textContent = priority.charAt(0).toUpperCase() + priority.slice(1);
            option.selected = todo.priority === priority;
            prioritySelect.appendChild(option);
        })

        form.append(prioritySelect);

        createFormElement('Notes:', 'textarea', 'notes', todo.notes);

        const buttonGroup = document.createElement('div');
        buttonGroup.className = 'button-group';

        const createButton = (text, type, id) => {
            const button = document.createElement('button');
            button.textContent = text;
            button.type = type;
            if (id) button.id = id;
            return button;
        };

        const saveButton = createButton("Save Changes", ' submit');
        const deleteButton = createButton('Delete Todo', 'button', 'delete-todo');
        const closeButton = createButton('Close', 'button', 'close-modal');

        buttonGroup.appendChild(saveButton);
        buttonGroup.appendChild(deleteButton);
        buttonGroup.appendChild(closeButton);

        form.appendChild(buttonGroup);

        modalContent.appendChild(form);
        modalContainer.appendChild(modalContent);
        document.body.appendChild(modalContainer);

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const updatedTodo = {
                title: form.title.value,
                description: form.description.value,
                dueDate: new Date(form.dueDate.value),
                priority: form.priority.value,
                notes: form.notes.value
            };
            this.editTodo(index, updatedTodo);
            modalContainer.remove();
        });

        deleteButton.addEventListener('click', () => {
            this.deleteTodo(index);
            modalContainer.remove();
        });

        closeButton.addEventListener('click', () => {
            modalContainer.remove();
        });


    }
    toggleTodoComplete(todoIndex) {
        const todo = this.currentProject.todos[todoIndex];
        todo.toggleComplete();
        this.saveToLocalStorage();
        this.render();
    }

}
export default TodoApp;