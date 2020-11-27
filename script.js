class TODOElement {
    constructor(id, name, priority, creationDate, reminderDate, status = "NEW") {
        this._id = id;
        this._name = name;
        this._priority = priority;
        this._creationDate = creationDate;
        this._reminderDate = reminderDate;
        this._status = status;
    }

    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }
    get name() {
        return this._name;
    }
    set name(newName) {
        this._name = newName;
    }
    get priority() {
        return this._priority;
    }
    set priority(newPriority) {
        this._priority = newPriority;
    }
    get creationDate() {
        return this._creationDate;
    }
    set creationDate(date) {
        this._creationDate = date;
    }
    get reminderDate() {
        return this._reminderDate;
    }
    set reminderDate(newDate) {
        this._reminderDate = newDate;
    }
    get status() {
        return this._status;
    }
    set status(newStatus) {
        this._status = newStatus;
    }

}

let toDoList = [], idCounter = 1;

function addElement(name, priority, reminderDate) {
    if (name === "") {
        console.log("Debe ingresar un nombre");
    }
    else if (!reminderDate) {
        console.log("Ingrese una Fecha válida");
    }
    else {
        const id = `RMNDR${counter}`;
        const creationDate = new Date();
        const newListElement = new TODOElement(id, name, priority, creationDate, reminderDate);
        toDoList.push(newListElement);
    }
}

function deleteElement(elementId) {


    toDoList.forEach(function (element, index) {
        if (element.id === elementId) {
            toDoList.splice(index, 1);
        }
    });
}
