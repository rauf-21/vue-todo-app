import { defineStore } from 'pinia'
import { Todo } from '../types/todo.interface'

const STORAGE_KEY = 'todo-list-storage'

export const useTodoListStore = defineStore('todoList', {
  state: () => ({
    todoList: (
      () => JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as Todo[]
    )()
  }),
  actions: {
    saveTodoList (todoList: Todo[]) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todoList))
    },
    addTodo (description: string, isComplete: boolean) {
      const id = +new Date()
      const newTodoList = [
        ...this.todoList, 
        {
          id,
          description,
          isComplete
        }
      ]
      
      this.saveTodoList(newTodoList)
      this.todoList = newTodoList
    },
    updateTodo (todoId: number, newValue: Object) {
      const newTodoList = this.todoList.map(todo => todo.id === todoId
        ? { ...todo, ...newValue }
        : todo
      )
      
      this.saveTodoList(newTodoList)
      this.todoList = newTodoList
    },
    deleteTodo (todoId: number) {
      const newTodoList = this.todoList.filter(todo => todo.id !== todoId)
  
      this.saveTodoList(newTodoList)
      this.todoList = newTodoList
    }
  },
})