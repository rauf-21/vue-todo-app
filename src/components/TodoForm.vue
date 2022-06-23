<script setup lang="ts">
import { reactive } from 'vue'
import { useTodoListStore } from '../stores/useTodoListStore'

const todoListStore = useTodoListStore()

const todo = reactive({
  description: '',
  isComplete: false
})

const handleSubmitTodo = (e: Event) => {
  e.preventDefault()

  if (todo.description.trim() === '') {
    alert('Input cannot be empty')
    return
  }

  todoListStore.addTodo(
    todo.description,
    todo.isComplete
  )

  todo.description = ''
}

</script>

<template>
  <section id="todo-form-container">
    <form class="p-4 flex flex-col" action="" @submit="handleSubmitTodo">
      <h2 class="font-bold">Todo Form</h2>
      <label class="my-4">Description</label>
      <input class="py-2 px-3 outline-0 border border-gray-400 rounded" type="text" v-model="todo.description">
      <button class="my-4 p-2 border rounded bg-indigo-500 font-bold text-white">Add Todo</button>
    </form>
  </section>
</template>