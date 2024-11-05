// Tüm Elemntleri seçmek

const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const filterInput = document.querySelector("#todoSearch");

let todos = [];
runEvents();

function runEvents() {
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", pageLoaded);
    secondCardBody.addEventListener("click", removeTodoUI);
    clearButton.addEventListener("click", clearTodos);
    filterInput.addEventListener("keyup", filter);
}

function filter(e) {  
    const filterValue = e.target.value.toLowerCase().trim();  
    const todoListesi = document.querySelectorAll(".list-group-item");  

    if (todoListesi.length > 0) {  
        todoListesi.forEach(function (todo) {  
            // Todo öğesinin metninin, filtre değerini içermesine göre göster veya gizle  
            if (todo.textContent.toLowerCase().trim().includes(filterValue)) {  
                todo.setAttribute("style","display :block");   // Göster
            } else {  
                todo.setAttribute("style","display :none !important");  // Gizle  
            }  
        });  
    } else {  
        showAlert("danger", "Listede Öge Bulunmamaktadır :(");  
    }  
}

function clearTodos() {
    const todoListesi = document.querySelectorAll(".list-group-item");
    if (todoListesi.length > 0) {
        // Ekrandan Silme Toplu 

        todoListesi.forEach(function (todo) {
            todo.remove();
        });
        // Storage Silme Toplu
        todos = [];
        localStorage.setItem("todos", JSON.stringify(todos));
        showAlert("success", "Liste Temizlendi.");
    } else { showAlert("danger", "Listede Silinecek Öge Yokdur...") };


}

function pageLoaded() {
    //Storage'dan todos çekme
    checkTodosFromStorage();
    todos.forEach(function (todo) {
        addTodoUI(todo);
    });
}

function removeTodoUI(e) {
    if (e.target.className === "fa fa-trash") {
        // Ön Yüzden Silme
        const todo = e.target.parentElement.parentElement;
        todo.remove();

        // Storage'den Silme 
        removeTodoToStorage(todo.textContent);
        showAlert("warning", "Satır Silindi...")

    }
}

function removeTodoToStorage(removeTodo) {
    checkTodosFromStorage();
    todos.forEach(function (todo, index) {
        if (removeTodo === todo) {
            todos.splice(index, 1);

        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}


function addTodo(e) {
    const inputText = addInput.value.trim();
    if (inputText == null || inputText == "") {
        showAlert("danger", "Lütfen Bir Değer Giriniz !!")
    } else {
        //Arayüze ekleme
        addTodoUI(inputText);
        addTodoStorage(inputText);
        showAlert("success", "Başarılı Şekilde eklendi :)");
    }
    //storage ekleme
    e.preventDefault();
}

function addTodoUI(newTodo) {


    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-action list-group-item-info d-flex justify-content-between';
    li.textContent = newTodo;

    const a = document.createElement('a');
    a.href = '#';
    a.className = 'delete-item';

    const i = document.createElement('i');
    i.className = "fa fa-trash";

    a.appendChild(i);

    li.appendChild(a);

    todoList.appendChild(li);

    addInput.value = " ";

}

function addTodoStorage(newTodo) {
    checkTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem('todos', JSON.stringify(todos));

}

function checkTodosFromStorage() {
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
}


function showAlert(type, message) {


    const div = document.createElement('div');
    div.className = `alert alert-${type}`;
    div.textContent = message;

    firstCardBody.appendChild(div);

    setTimeout(function () {
        div.remove();
    }, 2000);
}










