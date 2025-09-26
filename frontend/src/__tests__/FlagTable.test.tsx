import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import FlagTable from '@/components/FlagTable';
import { FeatureFlag } from '@/types/flag';

// Mock the hooks
jest.mock('@/hooks/useFlags', () => ({
  useToggleFlag: () => ({
    mutate: jest.fn(),
    isPending: false,
  }),
  useDeleteFlag: () => ({
    mutate: jest.fn(),
    isPending: false,
  }),
}));

const theme = createTheme();

const mockFlags: FeatureFlag[] = [
  {
    id: 1,
    name: 'new-checkout',
    description: 'Nova experiência de checkout',
    enabled: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 2,
    name: 'dark-mode',
    description: 'Modo escuro da aplicação',
    enabled: false,
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
  },
];

const renderWithProviders = (component: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        {component}
      </ThemeProvider>
    </QueryClientProvider>
  );
};

describe('FlagTable', () => {
  const mockOnEdit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders flags table with correct data', () => {
    renderWithProviders(
      <FlagTable flags={mockFlags} onEdit={mockOnEdit} />
    );

    expect(screen.getByText('new-checkout')).toBeInTheDocument();
    expect(screen.getByText('Nova experiência de checkout')).toBeInTheDocument();
    expect(screen.getByText('dark-mode')).toBeInTheDocument();
    expect(screen.getByText('Modo escuro da aplicação')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    renderWithProviders(
      <FlagTable flags={[]} onEdit={mockOnEdit} loading={true} />
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('shows error state', () => {
    const errorMessage = 'Error loading flags';
    renderWithProviders(
      <FlagTable flags={[]} onEdit={mockOnEdit} error={errorMessage} />
    );

    expect(screen.getByText(`Error loading flags: ${errorMessage}`)).toBeInTheDocument();
  });

  it('shows empty state when no flags', () => {
    renderWithProviders(
      <FlagTable flags={[]} onEdit={mockOnEdit} />
    );

    expect(screen.getByText('Nenhuma flag encontrada')).toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', () => {
    renderWithProviders(
      <FlagTable flags={mockFlags} onEdit={mockOnEdit} />
    );

    const editButtons = screen.getAllByLabelText(/edit/i);
    fireEvent.click(editButtons[0]);

    expect(mockOnEdit).toHaveBeenCalledWith(mockFlags[0]);
  });

  it('shows confirmation modal when delete button is clicked', async () => {
    renderWithProviders(
      <FlagTable flags={mockFlags} onEdit={mockOnEdit} />
    );

    const deleteButtons = screen.getAllByLabelText(/delete/i);
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(screen.getByText('Confirm Deletion')).toBeInTheDocument();
      expect(screen.getByText(/Are you sure you want to delete the flag 'new-checkout'/)).toBeInTheDocument();
    });
  });

  it('shows confirmation modal when toggle switch is clicked', async () => {
    renderWithProviders(
      <FlagTable flags={mockFlags} onEdit={mockOnEdit} />
    );

    const switches = screen.getAllByRole('checkbox');
    fireEvent.click(switches[0]);

    await waitFor(() => {
      expect(screen.getByText('Confirm DEACTIVATE Flag')).toBeInTheDocument();
      expect(screen.getByText(/Are you sure you want to deactivate the flag 'new-checkout'/)).toBeInTheDocument();
    });
  });
});
