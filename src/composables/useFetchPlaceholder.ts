import { ref, onMounted, onUnmounted } from 'vue'
import { computed } from '@vue/reactivity'
import axios, { type CancelTokenSource } from 'axios'
import randomNameClient from '@/axiosClients/randomNameClient'
import type { ClientResponse } from '@/types/types'

export const useFetchPlaceholder = () => {
  const data = ref<ClientResponse | null>(null)
  const isLoading = ref(false)
  const error = ref(null)
  const cancelTokenSource = ref<CancelTokenSource | null>(null)

  const placeholder = computed(() => {
    if (isLoading.value) return 'Loading next appointment'
    if (error.value) return 'Fallback TODO'
    if (!data.value) return 'Loading next target'
    return `Visit ${data.value.results[0] && data.value.results[0].name.first}`
  })

  const fetchData = async () => {
    isLoading.value = true
    error.value = null
    cancelTokenSource.value = axios.CancelToken.source()

    try {
      const response = await randomNameClient.getName({
        cancelToken: cancelTokenSource.value.token,
      })
      data.value = response.data
    } catch (err) {
      if (axios.isAxiosError(err)) {
        error.value = err.response ? err.response.data.message : err.message
      }
    } finally {
      isLoading.value = false
    }
  }

  onMounted(() => {
    fetchData()
  })
  onUnmounted(() => {
    if (cancelTokenSource.value) {
      cancelTokenSource.value.cancel('Request canceled by user.')
    }
  })

  return {
    placeholder,
    fetchData,
  }
}
