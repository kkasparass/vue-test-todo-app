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
    <li class="list-item" v-for="todo in todoList">
      <div class="todo-text-container">
        <input
          type="checkbox"
          @change="onChange(todo.id)"
          :checked="isCompletedList"
          :id="`checkbox_${todo.id}`"
        />
        {{ todo.label }}
      </div>
      <button @click="onDelete(todo.id)">delete</button>
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
}

.todo-list:last-child {
  padding: 20px 0;
}

@media (min-width: 1024px) {
}
</style>
