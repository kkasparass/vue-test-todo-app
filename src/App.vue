<script setup lang="ts">
import { ref } from 'vue'
import TitleInput from './components/TitleInput.vue'
import ListsSection from './components/ListsSection.vue'
import { v4 as uuidv4 } from 'uuid'
import type { TodoListItem } from './types/types'

const todoList = ref<TodoListItem[]>([])

const addTodo = (newTodo: string) =>
  todoList.value.push({ id: uuidv4(), label: newTodo, isChecked: false })

const toggleTodo = (todoId: string) => {
  todoList.value = todoList.value.map((todo) => {
    if (todo.id === todoId) return { ...todo, isChecked: !todo.isChecked }
    return todo
  })
}

const deleteTodo = (todoId: string) => {
  todoList.value = todoList.value.filter(({ id }) => todoId !== id)
}
</script>

<template>
  <header>
    <h1 class="icon-heading">✔️</h1>

    <div class="wrapper">
      <TitleInput :on-todo-create="addTodo" msg="DO it or else 🔪" />
    </div>
  </header>

  <main>
    <ListsSection :todo-list="todoList" :toggle-todo="toggleTodo" :delete-todo="deleteTodo" />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.icon-heading {
  font-size: 125px;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
