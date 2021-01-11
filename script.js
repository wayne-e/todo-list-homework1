class TODOElement {
    constructor(id, name, priority, creationDate, reminderDate, reminderTime, status = "Tarea Nueva") {
        this._id = id;
        this._name = name;
        this._priority = priority;
        this._creationDate = creationDate;
        this._reminderDate = reminderDate;
        this._reminderTime = reminderTime;
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
    get reminderTime() {
        return this._reminderTime;
    }
    set reminderTime(reminderTime) {
        this._reminderTime = reminderTime;
    }
    get status() {
        return this._status;
    }
    set status(newStatus) {
        this._status = newStatus;
    }

    createHTML() {
        let htmlTemplate = `
        <div id="${this._id}" class="flex todo-element">
            <div class="full-width relative-class">
                <i class="fas fa-window-close absolute-item delete-reminder-button"></i>
            </div>
            <h2 class="todo-title full-width">${this._name}</h2>
            <div class="flex full-width detail-element">
                <i class="fas fa-calendar detail-icon"></i>
                <h3>Fecha: <span class="todo-date">${this._reminderDate}</span></h3>
            </div>
            <div class="flex full-width detail-element">
                <i class="fas fa-clock detail-icon"></i>
                <h3>Hora: <span class="todo-time">${this._reminderTime}</span></h3>
            </div>
            <div class="flex full-width detail-element">
                <i class="fas fa-book detail-icon"></i>
                <h3>Fecha de Creación: <span class="todo-creationdate">${this._creationDate}</span></h3>
            </div>
            <div class="flex full-width detail-element">
                <i class="fas fa-exclamation-circle detail-icon"></i>
                <h3>Prioridad: <span class="todo-priority">${this.priority}</span></h3>
            </div>
            <div class="flex full-width detail-element">
                <i class="fas fa-flag detail-icon"></i>
                <h3>Estado: <span class="todo-state">${this._status}</span></h3>
            </div>                   
        `;
        if (this._status !== "Completo") {
            htmlTemplate += `
            <div class="flex full-width complete-box">
            <i class="fas fa-check detail-icon"></i>
            <h4>Marcar como Completo</h4>
            </div> `;
        }
        htmlTemplate += `</div>`;
        return htmlTemplate;
    }
}

const body = document.querySelector("body");
const newElementBtn = document.getElementById("new-element-button");
const formDiv = document.getElementById("form-div");
const saveButton = document.getElementById("savehw-btn");
const inputElementName = document.getElementById("todo-element-name");
const inputElementDate = document.getElementById("todo-element-date");
const inputElementTime = document.getElementById("todo-element-time");
const prioritySelect = document.getElementById("priority-select");
const closeModalBtn = document.getElementById("close-new-element");
const reminderSection = document.getElementById("reminder-section");
let deleteReminderButtons, completeButtons;
let toDoList = [], idCounter = 1, name, priority = 0, reminderDate, reminderTime, creationDate, parameter, id, index;

//readLocalStorage();

body.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-reminder-button")) {
        id = e.target.parentNode.parentNode.getAttribute("id");
        e.target.parentNode.parentNode.remove();
        toDoList.forEach(element => {
            if (element.id === id) {
                index = toDoList.indexOf(element);
                toDoList.splice(index, 1);
                toLocalStorage();
                return;
            }
        });
    }
    else if (e.target.classList.contains("complete-box")) {
        id = e.target.parentNode.getAttribute("id");
        e.target.remove();
        toDoList.forEach(element => {
            if (element.id === id) {
                element.status = "Completo";
                createElements();
                toLocalStorage();
                return;
            }
        });
    }
});

newElementBtn.addEventListener("click", function () {
    formDiv.classList.remove("display-none");
});

prioritySelect.onchange = function () {
    priority = prioritySelect.selectedIndex;
    if (priority === 1) {
        priority = "Normal";
    }
    else if (priority === 2) {
        priority = "Media";
    }
    else if (priority === 3) {
        priority = "Alta";
    }
}
saveButton.addEventListener("click", function () {
    creationDate = new Date();
    name = inputElementName.value;
    reminderDate = inputElementDate.value;
    reminderTime = inputElementTime.value;
    if (name === "") {
        alert("Debe ingresar un nombre");
        return;
    }
    if (reminderDate === "") {
        alert("Ingrese una Fecha válida");
        return;
    }
    else {
        parameter = parseInt(reminderDate[0] + reminderDate[1] + reminderDate[2] + reminderDate[3]);
        if (parameter < creationDate.getFullYear()) {
            alert("Ingrese un año válido")
            return;
        }
        else if (parameter === creationDate.getFullYear()) {
            parameter = parseInt(reminderDate[5] + reminderDate[6]);
            if (parameter < creationDate.getMonth() + 1) {
                alert("Ingrese un mes válido");
                return;
            }
            else if (parameter === creationDate.getMonth() + 1) {
                parameter = parseInt(reminderDate[8] + reminderDate[9]);
                if (parameter < creationDate.getDate()) {
                    alert("Ingrese un día válido");
                    return;
                }
                else if (parameter === creationDate.getDate()) {
                    parameter = parseInt(reminderTime[0] + reminderTime[1]);
                    if (parameter < creationDate.getHours()) {
                        alert("Hora inválida");
                        return;
                    }
                    else if (parameter < creationDate.getHours()) {
                        parameter = parseInt(reminderTime[3] + reminderTime[4]);
                        if (parameter <= creationDate.getMinutes()) {
                            alert("Hora inválida");
                            return;
                        }
                    }
                }
            }
        }
    }
    if (priority === 0) {
        alert("Seleccione nivel de Prioridad");
    }


    creationDate = creationDate.getFullYear() + "-" + (creationDate.getMonth() + 1) + "-" + creationDate.getDate();
    const id = `RMNDR${idCounter}`;
    const newListElement = new TODOElement(id, name, priority, creationDate, reminderDate, reminderTime);
    toDoList.push(newListElement);
    createElements();
    formDiv.classList.add("display-none");
    idCounter++;
    toLocalStorage();
});

closeModalBtn.addEventListener("click", function () {
    formDiv.classList.add("display-none");
});

//Enviar los objetos a HTML
function createElements() {
    reminderSection.innerHTML = "";
    for (let i = 0; i < toDoList.length; i++) {
        reminderSection.innerHTML += toDoList[i].createHTML();
    }
    deleteReminderButtons = document.getElementsByClassName("delete-reminder-button");
    completeButtons = document.getElementsByClassName("complete-box");
}

function toLocalStorage() {
    localStorage.setItem("reminders", JSON.stringify(toDoList));
    localStorage.setItem("idCounter", idCounter);
}
/*
function readLocalStorage() {
    alert("entra1");
    if (localStorage.getItem("reminders")) {
        alert("entra2");
        toDoList = JSON.parse(localStorage.getItem("reminders"), function (key, value) {
            //if (key) { 
                return new TODOElement(value); 
            //}
            //return value;
        });
        console.log(toDoList);
        idCounter = parseInt(localStorage.getItem("idCounter"));
        createElements();
    }
}*/