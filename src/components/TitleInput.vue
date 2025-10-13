<script setup lang="ts">
import { useFetchPlaceholder } from '@/composables/useFetchPlaceholder'
import { ref } from 'vue'

const { onTodoCreate } = defineProps<{
  msg: string
  onTodoCreate: (newTodo: string) => void
}>()

const { placeholder, fetchData } = useFetchPlaceholder()

const text = ref('')

const handleTodoCreate = () => {
  onTodoCreate(text.value || placeholder.value)
  text.value = ''
  fetchData()
}
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>Write down your vows, unbreakable promises, and destined actions:</h3>
  </div>
  <div class="input-container">
    <input class="input" v-model="text" :placeholder="placeholder" />
    <button @click="handleTodoCreate">send it</button>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.input-container {
  width: 100%;
  display: flex;
  gap: 15px;
}

.input {
  width: 100%;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
