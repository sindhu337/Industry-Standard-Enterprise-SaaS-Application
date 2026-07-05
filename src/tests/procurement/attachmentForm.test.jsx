import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import uiReducer from '@/app/store/slices/uiSlice'
import ProcurementForm from '@/features/procurement/components/ProcurementForm'

const createTestStore = () => configureStore({
  reducer: {
    ui: uiReducer,
  },
})

const renderForm = (props = {}) => {
  const store = createTestStore()
  return render(
    <Provider store={store}>
      <ProcurementForm
        onSubmit={jest.fn()}
        onCancel={jest.fn()}
        isSubmitting={false}
        {...props}
      />
    </Provider>,
  )
}

describe('procurement attachment picker', () => {
  it('opens the file picker and shows the selected file name', async () => {
    const user = userEvent.setup()
    renderForm()

    const input = document.getElementById('input-attachment')
    const file = new File(['test'], 'sample.pdf', { type: 'application/pdf' })

    await user.upload(input, file)

    expect(screen.getByText('sample.pdf')).toBeTruthy()
  })
})
