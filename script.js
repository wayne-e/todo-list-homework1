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
const searchInput = document.getElementById("search-input");
let deleteReminderButtons, completeButtons;
let name, priority = 0, reminderDate, reminderTime, creationDate, parameter, id, index;
let idCounter = parseInt(localStorage.getItem("idCounter")) || 1;
let toDoList = JSON.parse(localStorage.getItem("reminders")) || [];

createElements();

body.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-reminder-button")) {
        id = e.target.parentNode.parentNode.getAttribute("id");
        e.target.parentNode.parentNode.remove();
        toDoList.forEach(element => {
            if (element._id === id) {
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
            if (element._id === id) {
                element._status = "Completo";
                createElements();
                toLocalStorage();
                return;
            }
        });
    }
    else if (e.target.parentNode.classList.contains("filters-div")) {
        const parameter = e.target.getAttribute("id");
        reminderSection.innerHTML = "";
        if (parameter === "default") {
            createElements();
            return;
        }
        toDoList.forEach(element => {
            for (prop in element) {
                if (element[prop].includes(parameter)) {
                    reminderSection.innerHTML += createHTML(element);
                }
            }
        });
        deleteReminderButtons = document.getElementsByClassName("delete-reminder-button");
        completeButtons = document.getElementsByClassName("complete-box");

    }
});

newElementBtn.addEventListener("click", function () {
    formDiv.classList.remove("display-none");
    creationDate = new Date();
    let creationDay = creationDate.getDate(), creationMonth = creationDate.getMonth() + 1;
    if (creationMonth < 10) {
        creationMonth = "0" + creationMonth;
    }
    if (creationDay < 10) {
        creationDay = "0" + creationDay;
    }
    inputElementDate.setAttribute("min", `${creationDate.getFullYear()}-${creationMonth}-${creationDay}`);
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
                    if (parameter < creationDate.getHours() + 1) {
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

searchInput.onkeyup = function () {
    const searchParameter = searchInput.value;
    reminderSection.innerHTML = "";
    if (searchParameter === "") {
        createElements();
        return;
    }
    toDoList.forEach(element => {
        if (element._name.includes(searchParameter)) {
            reminderSection.innerHTML += createHTML(element);
        }
    });
    deleteReminderButtons = document.getElementsByClassName("delete-reminder-button");
    completeButtons = document.getElementsByClassName("complete-box");
}


//Enviar los objetos a HTML
function createElements() {
    reminderSection.innerHTML = "";
    toDoList.forEach(element => {
        reminderSection.innerHTML += createHTML(element);
    });
    deleteReminderButtons = document.getElementsByClassName("delete-reminder-button");
    completeButtons = document.getElementsByClassName("complete-box");
}

function toLocalStorage() {
    localStorage.setItem("reminders", JSON.stringify(toDoList));
    localStorage.setItem("idCounter", idCounter);
}

function createHTML(objeto) {
    let htmlTemplate = `
    <div id="${objeto._id}" class="flex todo-element">
        <div class="full-width relative-class">
            <i class="fas fa-window-close absolute-item delete-reminder-button"></i>
        </div>
        <h2 class="todo-title full-width">${objeto._name}</h2>
        <div class="flex full-width detail-element">
            <i class="fas fa-calendar detail-icon"></i>
            <h3>Fecha: <span class="todo-date">${objeto._reminderDate}</span></h3>
        </div>
        <div class="flex full-width detail-element">
            <i class="fas fa-clock detail-icon"></i>
            <h3>Hora: <span class="todo-time">${objeto._reminderTime}</span></h3>
        </div>
        <div class="flex full-width detail-element">
            <i class="fas fa-book detail-icon"></i>
            <h3>Fecha de Creación: <span class="todo-creationdate">${objeto._creationDate}</span></h3>
        </div>
        <div class="flex full-width detail-element">
            <i class="fas fa-exclamation-circle detail-icon"></i>
            <h3>Prioridad: <span class="todo-priority">${objeto._priority}</span></h3>
        </div>
        <div class="flex full-width detail-element">
            <i class="fas fa-flag detail-icon"></i>
            <h3>Estado: <span class="todo-state">${objeto._status}</span></h3>
        </div>                   
    `;
    if (objeto._status !== "Completo") {
        htmlTemplate += `
        <div class="flex full-width complete-box">
        <i class="fas fa-check detail-icon"></i>
        <h4>Marcar como Completo</h4>
        </div> `;
    }
    htmlTemplate += `</div>`;
    return htmlTemplate;
}
