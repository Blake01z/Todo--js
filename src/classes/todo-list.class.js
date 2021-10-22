import { Todo } from "./todo.class";

export class TodoList{

    static fromJson({id,tarea,completado,creado}){
        const tempTodo = new Todo(tarea);
        tempTodo.id = id;
        tempTodo.completado = completado;
        tempTodo.creado = creado;

        return tempTodo;
    }

    constructor(){

        // this.todos = [];
        this.cargarLocalStorage();
    }

    nuevoTodo(todo){
        this.todos.push(todo);
        this.guardarLocalStorage();
    }

    eliminarTodo(id){

        this.todos = this.todos.filter(todo => todo.id != id);
        this.guardarLocalStorage();
    }

    marcarCompletado(id){
        for(const todo of this.todos){
            if(todo.id === id){
                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break;
            }
        }
    }

    eliminarCompletados(){
        this.todos = this.todos.filter(todo => !todo.completado);
        this.guardarLocalStorage();
    }

    guardarLocalStorage(){
        localStorage.setItem('todo',JSON.stringify(this.todos));
    }

    cargarLocalStorage(){
        this.todos = (localStorage.getItem('todo')) ? JSON.parse(localStorage.getItem('todo')) : [];
        this.todos = this.todos.map(TodoList.fromJson);
    }

    pendientes(){
        const nuevoPendientes = this.todos.filter(todo => !todo.completado);
        return nuevoPendientes;
    }

    completos(){
        const nuevoCompletos =  this.todos.filter(todo => todo.completado);
        return nuevoCompletos;
    }
    
}