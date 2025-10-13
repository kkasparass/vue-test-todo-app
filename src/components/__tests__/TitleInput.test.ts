import { render, fireEvent } from '@testing-library/vue'
import { AxiosError } from 'axios'
import TitleInput from '../TitleInput.vue'
import { defaultDataResponse, errorMessage } from '@/components/__mocks__/mockedNameResponses'

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
  const mockCreateFn = vi.fn()

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('Renders initial data correctly and sends correct input value to prop function', async () => {
    const { getByText, getByPlaceholderText } = render(TitleInput, {
      props: { msg: 'Title Text', onTodoCreate: mockCreateFn },
    })

    expect(mockedGetName).toHaveBeenCalledOnce()

    getByText('Title Text')

    const input = getByPlaceholderText('Loading next target')
    await fireEvent.update(input, 'Buy cupcakes')

    const button = getByText('↳')
    await fireEvent.click(button)

    expect(mockCreateFn).toHaveBeenCalledExactlyOnceWith('Buy cupcakes')
    expect(mockedGetName).toHaveBeenCalledTimes(2)
  })

  it('Has correct placeholder once data loads', async () => {
    const { getByText, findByPlaceholderText } = render(TitleInput, {
      props: { msg: 'Title Text', onTodoCreate: mockCreateFn },
    })

    await findByPlaceholderText('Excecute Martha')

    const button = getByText('↳')
    await fireEvent.click(button)

    expect(mockCreateFn).toHaveBeenCalledExactlyOnceWith('Excecute Martha')
    expect(mockedGetName).toHaveBeenCalledTimes(2)
  })

  it('Has correct placeholder has fallback placeholder if name generator request fails', async () => {
    mockedGetName.mockRejectedValue(new AxiosError(errorMessage))
    const { getByText, findByPlaceholderText } = render(TitleInput, {
      props: { msg: 'Title Text', onTodoCreate: mockCreateFn },
    })

    await findByPlaceholderText('Kill god')

    const button = getByText('↳')
    await fireEvent.click(button)

    expect(mockCreateFn).toHaveBeenCalledExactlyOnceWith('Kill god')
    expect(mockedGetName).toHaveBeenCalledTimes(2)
  })
})
