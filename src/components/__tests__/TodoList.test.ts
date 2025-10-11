import { render, fireEvent } from '@testing-library/vue'
import TodoList from '../TodoList.vue'
import { mockTodoList } from '@/components/__mocks__/mockedTodoLists'

describe('TodoList', () => {
  const mockChangeFn = vi.fn()
  const mockDeleteFn = vi.fn()
  const defaultComponentProps = {
    todoList: mockTodoList,
    isCompletedList: false,
    onChange: mockChangeFn,
    onDelete: mockDeleteFn,
  }

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('Renders list correcly', async () => {
    const { getByLabelText, getAllByText } = render(TodoList, {
      props: defaultComponentProps,
    })

    mockTodoList.forEach(({ label }) => {
      getByLabelText(label)
    })

    expect(getAllByText('delete')).toHaveLength(5)
  })

  it('Clicking on checkbox calls passed onChange function', async () => {
    const { getByLabelText } = render(TodoList, {
      props: defaultComponentProps,
    })

    const input = getByLabelText(mockTodoList[0]?.label ?? '')
    await fireEvent.click(input)
    expect(mockChangeFn).toHaveBeenCalledExactlyOnceWith(mockTodoList[0]?.id)
  })

  it('Clicking on list item delete button calls passed onDelete function', async () => {
    const { getByTestId } = render(TodoList, {
      props: defaultComponentProps,
    })

    const deleteButton = getByTestId(`delete-button_${mockTodoList[0]?.id}`)
    await fireEvent.click(deleteButton)
    expect(mockDeleteFn).toHaveBeenCalledExactlyOnceWith(mockTodoList[0]?.id)
  })
})
