import { format, compareAsc, } from "date-fns";

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
    addnewtask.addTask('take out the trash');
    todolist.addProject(todolist.createProject('diffprojsametask'));
    const othernewtask = todolist.getProject('diffprojsametask');
    othernewtask.addTask('take out the trash');
    console.log(othernewtask.getAllTasks());
    todolist.listProjects();
    const newDate = '2000-05-03'; //think about how to input dates when changing the format
    othernewtask.changedueDate('take out the trash', newDate);
    console.log(othernewtask.getAllTasks());
    

}

function projectController() {
    let projects = [];

    function createProject(name) {
        const projectName = name;
        let tasks = [];
        const task = (title) => {
            let completed = false;
            let priority = 1;
            let dueDate = new Date();
        
            //add duedate and due date method
            return { title, completed, priority, dueDate, };
        } 

        const changedueDate = (description, date) => {
            const targetTaskIndex = getTask(description);
            if (targetTaskIndex > -1) {
                    tasks[targetTaskIndex].dueDate = new Date(date);
                    console.log('New due date is: ', format(tasks[targetTaskIndex].dueDate, 'yyyy-MM-dd'));
                    return tasks[targetTaskIndex].dueDate;
                }
                else{
                    return;
                }
        } //date must be in the format of (YYYY-MM-DD) since
        //HTML form <input type=date id=dateInput> will produce this format

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
                if (newPriority > 0 && newPriority < 6){
                    console.log('Please enter a priority from 1 to 5 instead');
                    return;
                }
                else if(tasks[targetTaskIndex].priority === newPriority){
                    console.log('Priority is unchanged');
                    return;
                }
                else{
                    tasks[targetTaskIndex].priority = newPriority;
                    console.log('New Priority is: ', tasks[targetTaskIndex].priority)
                    return tasks[targetTaskIndex].priority;
                }
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
        
        return { projectName, task, addTask, deleteTask, getAllTasks, getTask, changeTaskPriority, changeTaskComplete, changedueDate, }
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
    //for the date object, use the format method to output the correct format
}

//add local storage

TodoController();