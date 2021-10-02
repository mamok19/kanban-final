let task = {
    "todo": [],
    "in-progress": [],
    "done": []
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
        const taskElement = createElement("li",[], [])
        taskElement.appendChild(createElement('h3', [text], ['taskTitle']))
        taskElement.appendChild(createElement('h5',["done"]))
        taskElement.appendChild(createElement('h5',['❌']))
        taskElement.children[0].addEventListener('dblclick', DoubleClickEventListner);
        taskElement.children[0].addEventListener('focusout', outOffocusEvent)
        taskElement.addEventListener('mouseover', findSpecificLi);
        taskElement.addEventListener('mouseout', removeSpecificLiEvent);
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
        moveTask(event.target.parentElement, event.target, "todo")    
    }
    if(event.altKey === true && event.key === '2'){
            console.log(event)
            moveTask(event.target.parentElement, event.target, "in-progress")
    }
    if(event.altKey === true && event.key === '3'){
        moveTask(event.target.parentElement, event.target, "done")
    }
}
function deleteElement(){

}
function moveTask(parent, task, place){
    //createelemt ()
    parent.removeChild(task)
}
function findSpecificLi(event){
    console.log(event)
    if (event.target === 'li' || event.relatedTarget === 'li'){
        event.target.addEventListener('keyup', keyUpEventListner)
    }
}
function removeSpecificLiEvent(event){
    event.target.removeEventListener('keyup', keyUpEventListner)
}
document.addEventListener('click', addClickEventListner);

