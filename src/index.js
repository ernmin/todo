function projects() {
    projectarray = [];
    const createProject = (name) => {
        const projectName = name;
        let tasks = [];
        const task = (title) => {
            let completed = false;
            let priority = 1;
            //add change priority method
            //add change completed method
            //add duedate and due date method
            return { title, completed, priority };
        } 
        const addTask = (description) => {
        const newTask = task(description);
        tasks.push(newTask);  
        };
        const deleteTask = (taskItemNum) => {
            tasks.splice(taskItemNum, 1);
        }
        
        return { projectName, tasks, addTask, deleteTask, }
    }

    const addProjectMethod = (projectObject) => {
        projectarray.push(projectObject);
    }

    const deleteProjectMethod = (name) => {
        const targetProjectIndex = projects.findIndex(obj => obj.projectName === name);
        if (targetProjectIndex > -1) {
            projectarray.splice(targetProjectIndex, 1);
        }
    }

    let counter = 0;
    addProjectMethod(createProject('default'));
    while(counter < 2) {
        const projectName = prompt('Enter project name')
        addProjectMethod(createProject(projectName));
        counter++;
    }
    
    

    return { projectarray, createProject, addProjectMethod, deleteProjectMethod };
}

projects();


function ScreenController() {
    //create container for cards
    //create form for projects
    //create form for tasks
    //refresh screen after a project/task is added
}

//add local storage