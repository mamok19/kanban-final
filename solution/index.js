let task = {
    "todo": [],
    "in-progress": [],
    "done": []
}
let locationBeforeChange = ['', null];
let ifTwice = false

//functions

function saveToLocal (task){
    localStorage.task =JSON.stringify(task);
}

function reciveFromLocal(){
    if(localStorage.task !== undefined){
        const local = JSON.parse(localStorage.task)
        task.todo.push(local.todo)
        task["in-progress"].push(local["in-progress"])
        task.done.push(local.done)
    }
}
function createElement(tagName, children = [], classes = [], attributes = {}) {
    Elemen = document.createElement(tagName)

    //add children
    for (let child of children) {
        if (typeof child === "string" || typeof child === "number") {
            child = document.createTextNode(child)
        }
        Elemen.appendChild(child)
    }
    //add classes
    for (const cls of classes) {
        Elemen.classList.add(cls)
    }
    //add attributes
    for (const attribute in attributes) {
        Elemen.setAttribute(attribute, attributes[attribute])
    }
    return Elemen
}
function createTaskElement (place , text) {
    if (text){
        if(!findNameOfTask(text)){
            ifTwice = false;
            task[place].push(text)
            saveToLocal(task)
            const taskElement = createElement("li",[], ['bigElement'])
            taskElement.appendChild(createElement('h3', [text], ['taskTitle']))
            taskElement.children[0].addEventListener('dblclick', DoubleClickEventListner);
            taskElement.children[0].addEventListener('focusout', outOffocusEvent)
            taskElement.addEventListener('mouseenter', findSpecificLi);
            taskElement.addEventListener('mouseleave', removeSpecificLiEvent);
            switch (place){
                case "todo":
                    document.getElementById("to-do").appendChild(taskElement)
                    break;
                case "in-progress":
                    document.getElementById("in-progress-tasks").appendChild(taskElement)
                    break;
                case "done":
                    document.getElementById("done-tasks").appendChild(taskElement)
                    break;
                default:
                    alert ("wrong input")
            }
        }
        else{
            if (ifTwice){
                deleteFromTask(findNameOfTask(text))
                createTaskElement(place, text)
            }
        }
    }   
    else{
        alert ("you didnt write task property")
    }
}
function outOffocusEvent(event){
    event.target.setAttribute('contentEditable', false)
    if (!event.target.innerText){
        task[locationBeforeChange[0]].splice(parseInt(locationBeforeChange[1]), 1)
        event.target.parentElement.parentElement.removeChild(event.target.parentElement)
    }
    else {
        task[locationBeforeChange[0]][locationBeforeChange[1]] = event.target.innerText
    }
    saveToLocal(task)
}
function presenTaskFromLocal(task){
    for (const tas of task.todo){
        console.log(tas)
        createTaskElement("todo", tas)
    }
    for (const tas of task["in-progress"]){
        createTaskElement("in-progress", tas)
    }
    for (const tas of task.done){
        createTaskElement("done", tas)
    }
}
function addClickEventListner(event) {
    switch(event.target.classList[0]){
        case 'submit-add-to-do':
            createTaskElement("todo", document.querySelector("body > section.to-do > input").value)
            break;
        case 'submit-add-in-progress':
            createTaskElement("in-progress", document.querySelector("body > section.in-progress > input").value)
            break;
        case 'submit-add-done':
            createTaskElement("done", document.querySelector("body > section.done > input").value)
            break;
        }
    }
function DoubleClickEventListner(event){
    locationBeforeChange = findNameOfTask(event.target.innerText)
    event.target.setAttribute('contentEditable', true)
    event.target.focus();
}
function keyUpEventListner(event){
    if(event.altKey === true && event.key === '1'){
        moveTask(event.target.parentElement.parentElement,event.target.parentElement, "todo")    
    }
    if(event.altKey === true && event.key === '2'){
        moveTask(event.target.parentElement.parentElement,event.target.parentElement, "in-progress")
    }
    if(event.altKey === true && event.key === '3'){
        moveTask(event.target.parentElement.parentElement,event.target.parentElement, "done")
    }
}
function moveTask(parent,spectask, place, location = (findNameOfTask(spectask.children[0].innerText))){
    deleteFromTask(location)
    ifTwice = true;
    createTaskElement(place, spectask.children[0].innerText)
    parent.removeChild(spectask)
    saveToLocal(task)
}
function deleteFromTask([place, index]){
    task[place].splice(parseInt(index),1)
}
function findSpecificLi(event){
    event.target.parentNode.addEventListener('keydown', keyUpEventListner)
}
function removeSpecificLiEvent(event){
    event.target.removeEventListener('keydown', keyUpEventListner)
}

function searchByQuery(query) {
    for (memo of document.getElementById('searchResults').children){
        document.getElementById('searchResults').removeChild(memo)
    }
    let taskElement;
        if(query){
            for(let tasks of task.todo){
                taskElement = createElement('li', ["to-do: ",tasks])
                if(tasks.includes(query)){
                    document.getElementById('searchResults').appendChild(taskElement)
                }
            }
            for(let tasks of task["in-progress"]){
                taskElement = createElement('li', ["in-progress: ", tasks])
                if(tasks.includes((query))){
                    document.getElementById('searchResults').appendChild(taskElement)
                }

            }
            for(let tasks of task.done){
                taskElement = createElement('li', ["done: ",tasks])
                if(tasks.includes((query))){
                    document.getElementById('searchResults').appendChild(taskElement)
                }
            }
    }
  }

  function handleSearchEvent(event){
      searchByQuery(document.getElementById('search').value)
  }
function findNameOfTask(name){
    for (let names in task.todo){
        if(task.todo[names] === name){
            return ["todo" , parseInt(names)]; 
        }
    }
    for (let names in task['in-progress']){
        if(task['in-progress'][names] === name){
            return ["in-progress" , parseInt(names)]; 
        }
    }
    for (let names in task.done){
        if(task.done[names] === name){
            return ["done" , parseInt(names)]; 
        }
    }
}
// start if page
if(!localStorage.task){
    localStorage.task = JSON.stringify(task);
}
else {
    reciveFromLocal()
    presenTaskFromLocal(task);
}
document.addEventListener('click', addClickEventListner);
document.getElementById('search').addEventListener('input', handleSearchEvent)

