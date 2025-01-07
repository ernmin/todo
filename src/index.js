import { format, compareAsc } from "date-fns";

function TodoController() {
    const todolist = projectController();
    todolist.addProject(todolist.createProject('default'));
    todolist.addProject(todolist.createProject('default')); //test duplicate project
    todolist.listProjects();

    let counter = 0;
    while(counter < 2) {
        const projectName = prompt('Enter project name')
        todolist.addProject(todolist.createProject(projectName));
        counter++;
    }
    todolist.listProjects();
    const addnewtask = todolist.getProject('default');
    addnewtask.addTask('take out the trash');
    console.log(todolist.getProject('default').getAllTasks());
    const deleteTaskFromProject = todolist.getProject('default');
    deleteTaskFromProject.deleteTask('take out the trash');
    deleteTaskFromProject.deleteTask('take out');
    addnewtask.addTask('take out the trash');
    const changePriority = todolist.getProject('default');
    changePriority.changeTaskPriority('take out the trash', 3);
    changePriority.changeTaskComplete('take out the trash');
    console.log(todolist.getProject('default').getAllTasks());
    addnewtask.addTask('take out the trash'); //test duplicate

}

function projectController() {
    let projects = [];

    function createProject(name) {
        const projectName = name;
        let tasks = [];
        const task = (title) => {
            let completed = false;
            let priority = 1;
        
            //add duedate and due date method
            return { title, completed, priority, };
        } 
        const addTask = (description) => {
            const newTask = task(description);
            const checkTask = getTask(description);
            
            //tasks.push(newTask);
            if(checkTask > -1){
                console.log('task already exists');
                return;
            }
            else{
                tasks.push(newTask);
                console.log(newTask, ' was added');
                return;
            }
            
            //cannot add duplicate tasks
        };
        const deleteTask = (description) => {
            const targetTaskIndex = getTask(description);
            if (targetTaskIndex > -1) {
                const removedTask = tasks.splice(targetTaskIndex, 1);
                console.log('Task ', removedTask, ' was removed');
                return removedTask[0];
            }
            else{
                return;
            }
            
        }
        const getAllTasks = () => tasks;

        const getTask = (description) => {
            const targetTaskIndex = tasks.findIndex(obj => obj.title === description);
            if (targetTaskIndex > -1) {
                console.log('targetTaskIndex is: ', targetTaskIndex);
                return targetTaskIndex;
            }
            else{
                console.log('task not found');
                return;
            }
        }
        
        const changeTaskPriority = (description, newPriority) => {
            const targetTaskIndex = getTask(description);
            if (targetTaskIndex > -1) {
                tasks[targetTaskIndex].priority = newPriority;
                console.log('New Priority is: ', tasks[targetTaskIndex].priority)
                return tasks[targetTaskIndex].priority;
            }
            else{
                return;
            }
        }

        const changeTaskComplete = (description) => {
            const targetTaskIndex = getTask(description);
            if (targetTaskIndex > -1) {
                tasks[targetTaskIndex].completed = !tasks[targetTaskIndex].completed;
                console.log('Task complete status is: ', tasks[targetTaskIndex].completed)
                return tasks[targetTaskIndex].completed;
            }
            else{
                return;
            }
        }
        
        return { projectName, task, addTask, deleteTask, getAllTasks, getTask, changeTaskPriority, changeTaskComplete, }
    }

    function addProject(projectObject) {
        const targetProjectIndex = projects.findIndex(obj => obj.projectName === projectObject.projectName);
        if (targetProjectIndex > -1) {
            console.log('Project already exists, choose a different name');
        }
        else{
            const addedProject = projects.push(projectObject);
            console.log('Project ', addedProject, ' was added');
            return addedProject[0];
            
        }
        //projects.push(projectObject);
        //cannot add duplicate projects?
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
    
    function getProject(name) {
        const targetProjectIndex = projects.findIndex(obj => obj.projectName === name);
        if (targetProjectIndex > -1) {
            const targetProject = projects[targetProjectIndex];
            return targetProject;
        }
        else{
            console.log('Project not found');
        }
    }
    
    
    return { createProject, addProject, deleteProject, listProjects, getProject, };
}





function ScreenController() {
    //create container for cards
    //create form for projects
    //create form for tasks
    //refresh screen after a project/task is added
}

//add local storage

TodoController();