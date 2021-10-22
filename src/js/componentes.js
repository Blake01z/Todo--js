import { Todo } from "../classes";
import { todoList } from "../index";

//referecias en html
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const footer = document.querySelector('.footer');
const ulFilters = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = (todo) =>{
    const {tarea,completado,id,creado} = todo;
    const htmlTodo = `
    <li class="${(completado) ? 'completed' : ''}" data-id="${id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${(completado) ? 'checked' : ''}>
            <label>${tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement('DIV');
    div.innerHTML = htmlTodo;
    divTodoList.appendChild(div.firstElementChild);

    return div.firstChild;
};

//Eventos
txtInput.addEventListener('keyup',(e)=>{
    if(e.keyCode === 13 && txtInput.value !== ''){
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);

        crearTodoHtml(nuevoTodo);
        txtInput.value = '';
    }
});

divTodoList.addEventListener('click',e =>{

    const nombreElemento = e.target.localName;
    const todoElemento = e.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');

    if(nombreElemento.includes('input')){
        todoList.marcarCompletado(Number(todoId));
        todoElemento.classList.toggle('completed');
    }

    if(nombreElemento.includes('button')){
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
    }

});

btnBorrar.addEventListener('click',() =>{
    todoList.eliminarCompletados();
    for(let i=divTodoList.children.length-1; i>=0; i--){
        const elemento = divTodoList.children[i];
        if(elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }
    }
});

ulFilters.addEventListener('click',(e)=>{
    const filtro = e.target.text;

    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    e.target.classList.add('selected');

    if(!filtro){
        return;
    }else if(e.target.text === 'Pendientes'){
        const pendientes = todoList.pendientes();
        limpiarHTML();
        for(const pendiente of pendientes){
            crearTodoHtml(pendiente);
        }
    }else if(e.target.text === 'Completados'){
        const completos = todoList.completos();
        limpiarHTML();
        for(const completo of completos){
            crearTodoHtml(completo);
        }
    }else if(e.target.text === 'Todos'){
        limpiarHTML();
        todoList.todos.forEach(crearTodoHtml)
    }
})

function limpiarHTML(){
    while(divTodoList.firstChild){
        divTodoList.removeChild(divTodoList.firstChild);
    }
}


