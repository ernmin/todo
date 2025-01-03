import { format, compareAsc } from "date-fns";

function TodoController() {
    const todolist = projects();
    todolist.addProject(todolist.createProject('default'));
    todolist.listProjects();

    let counter = 0;
    while(counter < 2) {
        const projectName = prompt('Enter project name')
        todolist.addProject(todolist.createProject(projectName));
        counter++;
    }
    todolist.listProjects();
    
}

function projects() {
    let projects = [];

    function createProject(name) {
        const projectName = name;
        let tasks = [];
        const task = (title) => {
            let completed = false;
            let priority = 1;
            const changePriority = (newPriority) => {
                priority = newPriority;
            }
            //add change priority method
            //add change completed method
            //add duedate and due date method
            return { title, completed, priority, changePriority, };
        } 
        const addTask = (description) => {
            const newTask = task(description);
            tasks.push(newTask);  
        };
        const deleteTask = (taskItemNum) => {
            tasks.splice(taskItemNum, 1);
        }
        
        return { name, task, addTask, deleteTask, }
    }

    function addProject(projectObject) {
        projects.push(projectObject);
    }

    function deleteProject(name) {
        const targetProjectIndex = projects.findIndex(obj => obj.projectName === name);
        if (targetProjectIndex > -1) {
            const removedProject = projects.splice(targetProjectIndex, 1);
            console.log('Project ', removedProject, ' was removed');
            return removedProject[0];
        }
        else{
            console.log('Project not found');
        }
    }

    function listProjects() {
        console.log('Projects:', projects);
        return projects;
      }

    
    
    return { createProject, addProject, deleteProject, listProjects, };
}





function ScreenController() {
    //create container for cards
    //create form for projects
    //create form for tasks
    //refresh screen after a project/task is added
}

//add local storage

TodoController();