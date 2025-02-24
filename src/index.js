import { format, compareAsc, } from "date-fns";
import "./styles.css"

function TodoController() {
    const todolist = projectController();
    todolist.retrieveProject();
    console.log(typeof todolist);
    todolist.addProject(todolist.createProject('default'));
    todolist.addProject(todolist.createProject('default')); //test duplicate project
    todolist.addProject(todolist.createProject('Home'));
    todolist.listProjects();
    const allProjects = todolist.listProjects();
    console.log('allprojects: ',allProjects);
    for(let i = 0; i< allProjects.length; i++){
        allProjects[i].retrieveTasks(allProjects[i].projectName);
        console.log(allProjects[i].getAllTasks);
    }

    console.log(todolist.getProject('default').getAllTasks());
    
    
    /*
    const deleteTaskFromProject = todolist.getProject('default');
    deleteTaskFromProject.deleteTask('take out the trash');
    deleteTaskFromProject.deleteTask('take out');
    addnewtask.addTask('take out the trash');
    addnewtask.addTask('do the dishes');
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
    console.log(othernewtask.getAllTasks());*/


    //create container for cards
    //create form for projects
    //create form for tasks
    //refresh screen after a project/task is added
    //for the date object, use the format method to output the correct format


    
    const overlay = document.getElementById('overlay-bg');

    const runOpenModalButtons = () => {
        const openModalButtons = document.querySelectorAll('[data-modal-target]');
        openModalButtons.forEach(button => {
            button.addEventListener('click', () => {
                const modal = document.querySelector(button.dataset.modalTarget)
                console.log(button.dataset.modalTarget);
                
                openModal(modal);
                if(button.dataset.modalTarget == '#pop-up'){
                    document.querySelector("#project-title").focus();
                }

                
                //ADD A METHOD HERE TO POPULATE THE GRID WITH THE TODOS
            })
        })
    }

    runOpenModalButtons();

    const runOpenModalOneButton = (button) => {
        button.addEventListener('click', () => {
            const modal = document.querySelector(button.dataset.modalTarget)
            console.log(button.dataset.modalTarget);
            if(button.dataset.modalTarget == '#pop-up-focus'){
                let newProjectButton = document.querySelector("#newProjectButton");
                newProjectButton.disabled = true;
                const deletetaskbox = document.querySelector('#deletetaskbox');
                deletetaskbox.checked = false;
            }       
            openModal(modal);
        });
    }

    const runCloseModalButtons = () => {
        const closeModalButtons = document.querySelectorAll('[data-close-button]');
        closeModalButtons.forEach(button => {
            button.addEventListener('click', () =>{
                const modal = button.closest('.window');
                closeModal(modal);
                const modalfocusview = button.closest('.specific-card');
                closeModal(modalfocusview);
                let newProjectButton = document.querySelector("#newProjectButton");
                newProjectButton.disabled = false;
                focusviewitemsdelete();
            })
        })
    }

    const focusviewitemsdelete = () => {
        const specificcardbody = document.querySelector('#tablebody');
        while(specificcardbody.children.length > 1){
            specificcardbody.removeChild(specificcardbody.lastElementChild);
        }
    }


    const focusviewaddtasks = (alltasks, targetProject) => {
        const table = document.querySelector('#table-focus');
        alltasks.forEach(obj => {
            let row = table.insertRow();
            Object.entries(obj).forEach(([key, valueobject]) => {
                let cell = row.insertCell();
                if(key != 'project') {
                    if(key == 'dueDate'){
                        cell.textContent = format(valueobject, "dd/MM/yyyy");
                        focusviewdate(obj, cell);
                        focusviewdatemodal(cell);
                        //<input type=date id=dateInput>
                        /*let inputDate = document.createElement('input');
                        inputDate.setAttribute('contentEditable', 'true');
                        inputDate.setAttribute('type', 'date');
                        console.log('valueobject is: ', valueobject, ' ', typeof(valueobject));
                        inputDate.value = valueobject;
                        //inputDate.value = format(value, "dd/MM/yyyy");
                        cell.appendChild(inputDate);*/
                        //SEE CHATGPT ON DATEPICKERS
                    }
                    else if(key == 'completed'){
                        let checkbox = document.createElement('input');
                        
                        checkbox.setAttribute('type', 'checkbox');
                        checkbox.classList.add('checkbox-task');
                        if(valueobject == false){
                            checkbox.checked = false;
                        }
                        else{
                            checkbox.checked = true;
                        }
                        cell.appendChild(checkbox);
                        cell.classList.add('checkbox-table');
                        checkbox.addEventListener('change', () => {
                            targetProject.changeTaskComplete(obj.title);
                        })
                        let closeButton = document.createElement('button');
                        closeButton.setAttribute('data-close-button', 'true');
                        closeButton.innerHTML ='&times;'
                        closeButton.classList.add('close-button');
                        closeButton.classList.add('focus-close');
                        cell.appendChild(closeButton);
                        closeButton.style.display = 'none';
                    }
                    else if(key == 'priority'){
                        cell.textContent = valueobject;
                        cell.classList.add('priority-table');
                        cell.setAttribute('contentEditable', 'true');

                        let currentpriority = "";
                        cell.addEventListener('click', function() {
                            currentpriority = this.textContent;
                        });
                        let newpriority = "";
                        cell.addEventListener('focusout', function() {
                            newpriority = this.textContent;
                            targetProject.changeTaskPriority(obj.title, newpriority);
                            removeAllCards();
                            displayCard();
                        });
                        cell.addEventListener('input', function(event) {
                            this.textContent = this.textContent.replace(/[^1-5]/g, '');
                        });

                    }
                    else if(key == 'title'){
                        cell.textContent = valueobject;
                        cell.setAttribute('contentEditable', 'true');
                        let currenttask = "";
                        cell.addEventListener('click', function() {
                            currenttask = this.textContent;
                            
                        });
                        let newTask = "";
                        cell.addEventListener('focusout', function() {
                            newTask = this.textContent;
                            targetProject.renameTask(currenttask, newTask);
                            removeAllCards();
                            displayCard();
                        });

                    }

                }
            })
            

           })
    }

    runCloseModalButtons();

    
    const openModal = (modal) => {
        if (modal == null) return;
        modal.classList.add('bg-active');
        overlay.classList.add('bg-active');
    }

    const closeModal = (modal) => {
        if (modal == null) return;
        modal.classList.remove('bg-active');
        overlay.classList.remove('bg-active');
    }


    const createCard = (projectObject) => {
        const card = document.createElement('div');
        const title = document.createElement('div');
        const closeButton = document.createElement('button');
        closeButton.setAttribute('data-close-button', 'true');
        closeButton.innerHTML ='&times;'
        closeButton.classList.add('close-button');
        closeButton.id = 'button-' + projectObject.projectName;//Like this ID may contain whitespace..
        const closeButtonid = closeButton.id;
        title.appendChild(document.createTextNode(projectObject.projectName));
        title.classList.add('project-card-title');
        card.append(title, closeButton);
        card.classList.add('project-card');
        card.setAttribute('id', projectObject.projectName);
        document.querySelector('#projects').appendChild(card);
        closeButtonEventListener(closeButtonid);


        const tasksOnCardDiv = document.createElement('div');
        tasksOnCardDiv.classList.add('task-list');
        const orderedlist = document.createElement('ol');
        const tasksOnCard = listItemsOnCard(projectObject);
        if (tasksOnCard.length > 7) {
            for(let i = 0; i < 7; i++){
                const lineItem = document.createElement('li');
                lineItem.textContent = tasksOnCard[i].title;
                orderedlist.appendChild(lineItem);
            }
            const seemore = document.createElement('li')
            seemore.textContent = '......'
            orderedlist.appendChild(seemore);
        }
        else{
            tasksOnCard.forEach(task => {
                const lineItem = document.createElement('li');
                lineItem.textContent = task.title;
                orderedlist.appendChild(lineItem);
            });
        }

        tasksOnCardDiv.appendChild(orderedlist);
        card.appendChild(tasksOnCardDiv);

        const tasksCountDiv = document.createElement('div');
        const tasksCount = projectObject.getAllTasks();
        const tasksCountcompleted = countCompletedTasks(tasksCount);
        const tasksText = tasksCountcompleted + ' of ' + tasksCount.length + ' completed';
        tasksCountDiv.appendChild(document.createTextNode(tasksText));
        tasksCountDiv.classList.add('task-count');
        if(tasksCount.length != 0){
            card.appendChild(tasksCountDiv);
        }

        const focusviewbutton = document.createElement('button');
        focusviewbutton.textContent = 'See More';
        focusviewbutton.classList.add('btn', 'btn-primary', 'card-row');
        const focusviewbuttonAttribute = 'data-' + 'modal-target';
        focusviewbutton.setAttribute(focusviewbuttonAttribute, '#pop-up-focus');
        card.appendChild(focusviewbutton);
        runOpenModalOneButton(focusviewbutton);
        focusviewtitle(focusviewbutton);
        focusviewitems(focusviewbutton);
    }

    const focusviewtitle = (button) => {
        button.addEventListener('click', (event) => {
            const parentDiv = event.target.parentElement;
            const title = document.querySelector('#title-popup');
            title.textContent = parentDiv.id;
            focusviewhidecheckbox();
        });
    }

    const focusviewitems = (button) => {
        button.addEventListener('click', (event) => {
           const parentDiv = event.target.parentElement;
           let targetProject = todolist.getProject(parentDiv.id);
           let alltasks = targetProject.getAllTasks();
           console.log('focusviewitems alltasks is ',targetProject.getAllTasks());
           const table = document.querySelector('#table-focus');
           while(table.rows.length > 1) {
            table.deleteRow(1);
           }
           const notasks = document.querySelector('.notask');
           if(alltasks.length == 0){
            const card = document.querySelector('#pop-up-focus')
            notasks.classList.add('notask')
            notasks.textContent = 'No Tasks for this Project Yet';
            //FIX THIS AS IT NO LONGER APPEARS USING FLEX BOX
            card.appendChild(notasks);
           }
           else {
            notasks.textContent = '';
           }
           focusviewaddtasks(alltasks, targetProject);
           focusviewdeletetaskEventListener();
           
        });
        
        //change due date format when printed on the table
        //When focus view is open, don't allow scrolling in the background
        //Scrolling in a modal
        //DELETE BUTTON FOR TASKS
        //ADD TASKS BUTTON

    
    }
    const focusviewdate = (taskobj, cell) => {
        cell.addEventListener('click', () => {
            const tasktitle = document.querySelector('#task-title-popup');
            tasktitle.textContent = taskobj.title;
            
            console.log('focusviewtask', taskobj);
            //How to open the new modal?
            //New Modal Close Button
            //Only 1 modal open at a time
        })
    }

    const focusviewdatemodal = (cell) => {
        const cellAttribute = 'data-' + 'modal-target';
        cell.setAttribute(cellAttribute, '#task-title-popup');
    }

    const focusviewhidecheckbox = () => {
        const deletetaskbox = document.querySelector('#deletetaskbox');
        deletetaskbox.addEventListener('click', (event) => {
            let taskboxall = document.querySelectorAll('.checkbox-task');
            let closeButtonall = document.querySelectorAll('.focus-close');
            if(event.target.checked){
                for(let i = 0; i < taskboxall.length; i++) {
                    taskboxall[i].style.display = 'none';
                    closeButtonall[i].style.display = 'block';
                }
            }
            else{
                for(let i = 0; i < taskboxall.length; i++) {
                    taskboxall[i].style.display = 'block';
                    closeButtonall[i].style.display = 'none';
                }
            }
        })
    }

    //put this method to run when the modal is open
    const focusviewdeletetaskEventListener = () => {
        let project = document.querySelector("#title-popup").textContent;
        let taskclosebutton = document.querySelectorAll('.focus-close');
        for(let i = 0; i < taskclosebutton.length; i++){
            taskclosebutton[i].addEventListener('click', () => {
                let parent = taskclosebutton[i].parentElement;
                let taskname = parent.nextElementSibling.textContent;
                console.log(project, taskname);
                const deleteTaskFromProject = todolist.getProject(project);
                deleteTaskFromProject.deleteTask(taskname);
                refreshfocusview();
                let checkbox = document.querySelector("#deletetaskbox");

                checkbox.click();
                checkbox.click();
            })
        }

    }
    //WHEN DELETING AN ITEM, USE REFRESHFOCUSVIEW AND TICK TOP CHECKBOX 
    // TO GIVE THE ILLUSION THAT THE SINGLE TASK IS DELETED
    //TO DELETE add closeButtonEventListenerTask Method, the above two lines can go into this method.
    //Check the CreateCard Method
    //const deleteTaskFromProject = todolist.getProject('default');
    //deleteTaskFromProject.deleteTask('take out the trash');
    //click button
    //get project
    //get task name
    //delete task
    //refresh focus view
    //tick top check box

    /*const focusviewdeletetask = (deletetaskid) => {
        deletetaskid = '#' + deletetaskid;
        const deletetask = document.querySelector(deletetaskid);
    }*/


    const countCompletedTasks = (arrayoftasks) => {
        let count = 0;
        for(let i = 0; i < arrayoftasks.length; i++){
            if (arrayoftasks[i].completed != false){
                count ++;
            }
            else {
                continue;
            }
        }
        return count;
    }

    const closeButtonEventListener = (closeButtonid) => {
        closeButtonid = '#' + closeButtonid;
        const allCloseButtons = document.querySelector(closeButtonid);
        console.log(allCloseButtons);
        allCloseButtons.addEventListener('click', () => {
                const parentDiv = allCloseButtons.parentElement;
                const parentId = parentDiv.id;
                console.log('parent id is ', parentId);
                let confirmdelete = confirm('Delete Project?');
                if(confirmdelete == true){
                    todolist.deleteProject(parentId);
                    removeAllCards();
                    displayCard();
                }
        });
    }

    const listItemsOnCard = (projectObject) => {
        const tasks = projectObject.getAllTasks();
        console.log('listItemsOncard ', tasks);
        return tasks;
    }

    const removeAllCards = () => {
        let projects = document.querySelector('.projects');
        let allprojects = document.querySelectorAll('.project-card');
        for(let i = 0; i < allprojects.length; i++){
            projects.removeChild(allprojects[i]);
        }
    }

    const displayCard = () => {
        const allProjects = todolist.listProjects();
        for(let i = 0; i< allProjects.length; i++){
            createCard(allProjects[i]);
            console.log('displaycard', allProjects[i]);
        }
    }

    const newProjectForm = () => {
        document.querySelector("#newprojectform").addEventListener("submit", function(event){
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            const formObject = Object.fromEntries(formData.entries());
            console.log('new project from form is: ', formObject);
            todolist.addProject(todolist.createProject(formObject.projecttitle));
            removeAllCards();
            document.querySelector("#newprojectform").reset();
            let popup = document.querySelector('#pop-up');
            popup.classList.remove('bg-active');
            let overlaybg = document.querySelector('#overlay-bg');
            overlaybg.classList.remove('bg-active');
            displayCard();
        })
    }

    const newTaskForm = () => {
        document.querySelector("#taskform").addEventListener("submit", function(event){
            event.preventDefault();
            let project = document.querySelector("#title-popup").textContent;
            const form = event.target;
            const formData = new FormData(form);
            const formObject = Object.fromEntries(formData.entries());
            const targetProject = todolist.getProject(project);
            const taskadded = targetProject.addTask(formObject.tasktextid);
            if(taskadded > -1){
                alert('Duplicate Task');
                return
            }
            if(formObject.checkboxtaskid == 'on'){
                targetProject.changeTaskComplete(formObject.tasktextid);
            }
            let taskprioritynum = parseInt(formObject.taskpriorityid);
            if (taskprioritynum > 6 || taskprioritynum < 1 || isNaN(taskprioritynum)) {
                alert('Invalid Priority, Task will be assigned with priority of 1');
            }
            else if(taskprioritynum != 1){
                targetProject.changeTaskPriority(formObject.tasktextid, taskprioritynum);
            }

            refreshfocusview();
            
        })
        
    }
    //Add functionality for the DATE

    const refreshfocusview = () => {
        focusviewitemsdelete();
        let project = document.querySelector("#title-popup").textContent;
        let targetProject = todolist.getProject(project);
        let alltasks = targetProject.getAllTasks();
        focusviewaddtasks(alltasks, targetProject);
        focusviewdeletetaskEventListener(); //WHY IS THE SCOPE FOR THIS WRONG?
        removeAllCards();
        displayCard();
    }
    
    

    displayCard();
    newProjectForm();
    newTaskForm();
}

function projectController() {
    let projects = [];
    let projectTitles = [];

    function createProject(name) {
        const projectName = name;
        let tasks = [];
        const storeAllTasks = () => {
            let alltasksarray_serialized = JSON.stringify(tasks);
            console.log('serialize test', alltasksarray_serialized);
            let taskKey = projectName;
            localStorage.setItem(taskKey, alltasksarray_serialized);
            //item goes into local storage. If I set item a second time with a different key, it will be written over
            let taskObject_reversed = JSON.parse(localStorage.getItem(taskKey));
            //item is taken out of local storage
            console.log('parse test', taskObject_reversed);
        }
        const task = (title) => {
            let completed = false;
            let priority = 1;
            let dueDate = new Date();
            let project = name;
        
            return {  completed, title, dueDate, priority, project};
        } 

        const changedueDate = (description, date) => {
            const targetTaskIndex = getTask(description);
            if (targetTaskIndex > -1) {
                //let newDate = new Date(date);
                //INSTEAD OF NEW POP UP FOR DATES, TYPE IN THE FORMAT AND REJECT IT IF IT IS NOT IN THE CORRECT FORMAT
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
            if(description === ""){
                console.log('empty task not added');
                alert("Please enter a valid task");
                return
            }
            const newTask = task(description);
            console.log('check new task', newTask);
            const checkTask = getTask(description);
            if(checkTask > -1){
                console.log('task already exists');
                return checkTask;
            }
            else{
                tasks.push(newTask);
                storeAllTasks();
                console.log(newTask, ' was added');
                return;
            }
            
            //cannot add duplicate tasks
            //BUTTON BELOW ALL THE TASKS
        };

        const renameTask = (description, newDescription) => {
            const targetTaskIndex = getTask(description);
            if (targetTaskIndex > -1) {
                if(tasks[targetTaskIndex].title === newDescription){
                    console.log('rename task failed, task description unchanged');
                }
                else if(newDescription.length < 1){
                    console.log('invalid task name');
                    tasks[targetTaskIndex].title = description;
                    return;
                }
                else {
                    tasks[targetTaskIndex].title = newDescription;
                    console.log('New task description is: ', tasks[targetTaskIndex].title)
                    storeAllTasks();
                    return tasks[targetTaskIndex].title;
                }
            }
            else{
                console.log('task not found')
                return;
            }
        }

        const deleteTask = (description) => {
            const targetTaskIndex = getTask(description);
            if (targetTaskIndex > -1) {
                const removedTask = tasks.splice(targetTaskIndex, 1);
                console.log('Task ', removedTask, ' was removed');
                storeAllTasks();
                return removedTask[0];
            }
            else{
                return;
            }
            //MOUSE OVER TO REVEAL CROSS TO DELETE TASK
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
                if (newPriority < 0 || newPriority > 6){
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
                    storeAllTasks();
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

        const retrieveTasks = (projectName) => {
            let tasksofProject = localStorage.getItem(projectName);
            if (tasksofProject == null) {
                console.log('no tasks for ', projectName, ' to retrieve');
                return;
            }
            else {
                let tasksofProject_unserialized = JSON.parse(tasksofProject);
                for(let i = 0; i < tasksofProject_unserialized.length; i++){
                    tasksofProject_unserialized[i].dueDate = new Date(tasksofProject_unserialized[i].dueDate);
                    tasks.push(tasksofProject_unserialized[i]);
                    console.log(tasksofProject_unserialized[i], ' was added to ', projectName);
                }
            }
        }
        
        return { projectName, task, addTask, renameTask, retrieveTasks, storeAllTasks, deleteTask, getAllTasks, getTask, changeTaskPriority, changeTaskComplete, changedueDate, }
    }

    function addProject(projectObject) {
        const targetProjectIndex = projects.findIndex(obj => obj.projectName === projectObject.projectName);
        if (targetProjectIndex > -1) {
            console.log('Project already exists, choose a different name');
        }
        else{
            const addedProject = projects.push(projectObject);
            projectTitles.push(projectObject.projectName);
            storeProject();
            console.log('Project ', projectObject.projectName, ' was added');
            return addedProject[0];
            
        }
    }

    function storeProject() {

        localStorage.setItem('projectTitles', JSON.stringify(projectTitles));
        let listofProjects = localStorage.getItem('projectTitles');
        let listofProjectsArray = JSON.parse(listofProjects);
        console.log('list of projects: ', listofProjectsArray);

        //store an array of the titles of the projects
        //when retrieving loop through the array and recreate the project from scratch
        //add the recreated project into the main project array.
        //key can just be the project name

    }

    function deleteProject(name) {
        const targetProjectIndex = projects.findIndex(obj => obj.projectName === name);
        if (targetProjectIndex > -1) {
            const removedProject = projects.splice(targetProjectIndex, 1);
            projectTitles.splice(targetProjectIndex, 1);
            storeProject();
            console.log('projecttitles are: ',projectTitles);
            console.log('Project ', removedProject, ' was removed');
            localStorage.removeItem(name);
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
    
    function retrieveProject() {
        let listofProjects = localStorage.getItem('projectTitles');
        if (listofProjects == null){
            console.log('no projects to retrieve');
            return;
        }
        let listofProjectsArray = JSON.parse(listofProjects);
        for(let i = 0; i < listofProjectsArray.length; i++){
            let project = createProject(listofProjectsArray[i]);
            addProject(project);
            console.log('project: ', project.projectName, ' was retrieved');
        }
    }
    
    return { createProject, addProject, storeProject, retrieveProject, deleteProject, listProjects, getProject, };
}



TodoController();