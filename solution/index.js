let task = {
    "todo": ['1'],
    "in-progress": ['2'],
    "done": ['3']
}

function saveToLocal (task){
    localStorage.task =JSON.stringify(Task);
}

function reciveFromLocal(){
    if(local.task !== undefined){
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
        const taskElement = createElement("li",[], ['bigElement'])
        taskElement.appendChild(createElement('h3', [text], ['taskTitle']))
        taskElement.appendChild(createElement('h5',["done"],['parent']))
        taskElement.appendChild(createElement('h5',['❌'],['parent']))
        taskElement.children[0].addEventListener('dblclick', DoubleClickEventListner);
        taskElement.children[0].addEventListener('focusout', outOffocusEvent)
        taskElement.addEventListener('mouseenter', findSpecificLi);
        // taskElement.addEventListener('mouseleave', removeSpecificLiEvent);
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
        alert ("you didnt write any task")
    }
}
function outOffocusEvent(event){
    event.target.setAttribute('contentEditable', false)
}
function presenTaskFromLocal(task){
    for (const tas of task.todo){
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
function deleteElement(){

}
function moveTask(parent,task, place){
    parent.removeChild(task)
    createTaskElement(place, task.children[0].innerText)
}
function findSpecificLi(event){
    event.target.parentNode.addEventListener('keydown', keyUpEventListner)
}
function removeSpecificLiEvent(event){
    event.target.removeEventListener('keyup', keyUpEventListner)
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

// start if page
document.addEventListener('click', addClickEventListner);
document.getElementById('search').addEventListener('input', handleSearchEvent)

