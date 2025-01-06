import { format, compareAsc } from "date-fns";

function TodoController() {
    const todolist = projectController();
    todolist.addProject(todolist.createProject('default'));
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
    console.log(todolist.getProject('default').getTask());
    const deleteTaskFromProject = todolist.getProject('default');
    deleteTaskFromProject.deleteTask('take out the trash');
    deleteTaskFromProject.deleteTask('take out');


}

function projectController() {
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
        const deleteTask = (description) => {
            const targetTaskIndex = tasks.findIndex(obj => obj.title === description);
            if (targetTaskIndex > -1) {
                const removedTask = tasks.splice(targetTaskIndex, 1);
                console.log('Task ', removedTask, ' was removed');
                return removedTask[0];
            }
            else{
                console.log('Task not found');
            }
            //tasks.splice(taskItemNum, 1);
        }
        const getTask = () => tasks;
        
        
        return { projectName, task, addTask, deleteTask, getTask}
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