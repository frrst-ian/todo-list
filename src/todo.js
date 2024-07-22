class Todo {
    constructor(title, description = '', dueDate = null, priority = 'medium', notes = '') {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
        this.notes = notes;
    }
    
    toggleComplete() {
        this.completed = !this.completed
    }
}

export default Todo;

