<script setup lang="ts">
import type { TodoListItem } from '@/types/types'

defineProps<{
  todoList: TodoListItem[]
  onChange: (todoLabel: string) => void
  onDelete: (todoLabel: string) => void
  isCompletedList?: boolean
}>()
</script>

<template>
  <div class="todo-list">
    <h2>{{ isCompletedList ? 'Completed Items' : 'To Be Done' }}</h2>
    <li class="list-item" v-for="todo in todoList" :key="todo.id">
      <div class="todo-text-container">
        <input
          type="checkbox"
          :checked="todo.isChecked"
          :id="`checkbox_${todo.id}`"
          @change="onChange(todo.id)"
        />
        <label :for="`checkbox_${todo.id}`">{{ todo.label }}</label>
      </div>
      <button @click="onDelete(todo.id)" :data-testid="`delete-button_${todo.id}`">delete</button>
    </li>
  </div>
</template>

<style scoped>
.list-item {
  list-style: none;
  display: flex;
  gap: 16px;
  justify-content: space-between;
  align-items: center;
}

.todo-text-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.todo-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: auto;
}

.todo-list:first-child {
  border-bottom: 2px solid orange;
  padding-bottom: 20px;
}

.todo-list:last-child {
  padding: 20px 0;
}

@media (min-width: 1024px) {
}
</style>
