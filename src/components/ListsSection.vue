<script setup lang="ts">
import { computed } from 'vue'
import TodoList from './TodoList.vue'
import type { TodoListItem } from '@/types/types'

const { todoList } = defineProps<{
  todoList: TodoListItem[]
  toggleTodo: (todoId: string) => void
  deleteTodo: (todoId: string) => void
}>()

const undoneTodos = computed(() => todoList.filter(({ isChecked }) => !isChecked))

const completedTodos = computed(() => todoList.filter(({ isChecked }) => isChecked))
</script>

<template>
  <div class="section-container">
    <div class="lists-container">
      <TodoList :todo-list="undoneTodos" :on-change="toggleTodo" :on-delete="deleteTodo" />

      <TodoList
        :todo-list="completedTodos"
        :on-change="toggleTodo"
        :on-delete="deleteTodo"
        :is-completed-list="true"
      />
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  .section-container {
    box-sizing: border-box;
    height: 80vh;
    border-left: 5px solid gray;
    padding: 0 20px;
  }

  .lists-container {
    height: 100%;
    display: grid;
    grid-template-rows: 1fr 1fr;
  }
}
</style>
