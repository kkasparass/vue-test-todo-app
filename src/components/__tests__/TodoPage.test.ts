import { render, fireEvent } from '@testing-library/vue'
import TodoPage from '../TodoPage.vue'
import { defaultDataResponse } from '@/components/__mocks__/mockedNameResponses'

describe('TitleInput', () => {
  const { mockedGetName } = vi.hoisted(() => {
    return {
      mockedGetName: vi.fn(async () => defaultDataResponse),
    }
  })
  vi.mock('@/axiosClients/randomNameClient', () => ({
    default: {
      getName: mockedGetName,
    },
  }))

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('TitleInput adds a new todo', async () => {
    const { getByText, findByPlaceholderText, getByLabelText } = render(TodoPage)

    await findByPlaceholderText('Visit Martha')

    const button = getByText('↳')
    await fireEvent.click(button)

    expect(getByLabelText('Visit Martha'))
  })

  it('Clicking on new todo item sends it to the completed list', async () => {
    const { getByText, findByPlaceholderText, getByLabelText } = render(TodoPage)

    await findByPlaceholderText('Visit Martha')

    const button = getByText('↳')
    await fireEvent.click(button)

    const input = getByLabelText('Visit Martha')
    await fireEvent.click(input)

    const todoListContainer = getByText('To Be Done').parentElement
    expect(todoListContainer).not.toContain(getByLabelText('Visit Martha'))

    const completedListContainer = getByText('Completed Items').parentElement
    expect(completedListContainer).toContain(getByLabelText('Visit Martha'))
  })
})
