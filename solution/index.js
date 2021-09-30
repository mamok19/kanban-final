let task = {
    "todo": [],
    "in-progress": [],
    "done": []
}

function saveToLocal (task){
    localStorage.task =JSON.stringify(Task);
}

function ReciveFromLocal(){
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
function CreateTaskElement () {
    
}