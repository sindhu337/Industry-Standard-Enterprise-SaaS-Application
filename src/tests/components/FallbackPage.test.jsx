import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FallbackPage from '@/components/feedback/FallbackPage';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('FallbackPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(
      <MemoryRouter>
        <FallbackPage />
      </MemoryRouter>
    );
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText(/An unexpected error occurred/i)).toBeInTheDocument();
  });

  it('navigates to home when "Back to Home" is clicked', () => {
    render(
      <MemoryRouter>
        <FallbackPage />
      </MemoryRouter>
    );
    const homeBtn = screen.getByRole('button', { name: /Back to Home/i });
    fireEvent.click(homeBtn);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('reloads the page when "Refresh Page" is clicked', () => {
    render(
      <MemoryRouter>
        <FallbackPage />
      </MemoryRouter>
    );
    const refreshBtn = screen.getByRole('button', { name: /Refresh Page/i });
    fireEvent.click(refreshBtn);
  });
});
