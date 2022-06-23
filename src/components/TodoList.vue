<script setup lang="ts">
import { computed } from 'vue'
import { useTodoListStore } from '../stores/useTodoListStore'

const todoListStore = useTodoListStore()

const completedTodoList = computed(() => todoListStore.todoList.filter((todo) => todo.isComplete))

const uncompletedTodoList = computed(() => todoListStore.todoList.filter((todo) => !todo.isComplete))

const handleCheckTodo = (todoId: number, isComplete: boolean) => {
  todoListStore.updateTodo(
    todoId,
    {
      isComplete: !isComplete
    }
  )
}

const handleDeleteTodo = (todoId: number) => {
  todoListStore.deleteTodo(todoId)
}

</script>

<template>
  <section class="flex lg:flex-row flex-col" id="todo-list">
    <div class="mx-4 mb-4 p-4 basis-1/2 border rounded" id="uncompleted-todo-list-container">
      <h2 class="pb-4 font-bold border-b-2 border-b-emerald-600">Completed Todo</h2>
      <ul v-if="completedTodoList.length > 0">
        <li class="flex flex-row justify-between grow-0 my-2" v-for="todo in completedTodoList">
          <p class="py-4 grow-0 break-all">{{ todo.description }}</p>
          <div class="flex flex-row items-center">
            <button class="mx-2 p-2 bg-emerald-600 rounded text-white font-bold"
              @click="handleCheckTodo(todo.id, todo.isComplete)">Uncheck</button>
            <button class="mx-2 p-2 bg-red-500 rounded text-white font-bold"
              @click="handleDeleteTodo(todo.id)">Delete</button>
          </div>
        </li>
      </ul>
      <div v-else>
        <p class="my-4 text-center">Empty</p>
      </div>
    </div>
    <div class="mx-4 mb-4 p-4 basis-1/2 border rounded" id="completed-todo-list-container">
      <h2 class="pb-4 font-bold border-b-2 border-b-red-500">Uncompleted Todo</h2>
      <ul v-if="uncompletedTodoList.length > 0">
        <li class="flex flex-row justify-between grow-0 my-2" v-for="todo in uncompletedTodoList">
          <p class="py-4 grow-0 break-all">{{ todo.description }}</p>
          <div class="flex flex-row items-center">
            <button class="mx-2 p-2 bg-emerald-600 rounded text-white font-bold"
              @click="handleCheckTodo(todo.id, todo.isComplete)">Check</button>
            <button class="mx-2 p-2 bg-red-500 rounded text-white font-bold"
              @click="handleDeleteTodo(todo.id)">Delete</button>
          </div>
        </li>
      </ul>
      <div v-else>
        <p class="my-4 text-center">Empty</p>
      </div>
    </div>
  </section>
</template>