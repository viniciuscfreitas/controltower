import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import FlagModal from '@/components/FlagModal';
import { FeatureFlag } from '@/types/flag';

// Mock the hooks
jest.mock('@/hooks/useFlags', () => ({
  useCreateFlag: () => ({
    mutateAsync: jest.fn().mockResolvedValue({}),
    isPending: false,
    error: null,
  }),
  useUpdateFlag: () => ({
    mutateAsync: jest.fn().mockResolvedValue({}),
    isPending: false,
    error: null,
  }),
}));

const theme = createTheme();

const mockFlag: FeatureFlag = {
  id: 1,
  name: 'new-checkout',
  description: 'Nova experiência de checkout',
  enabled: true,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
};

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

describe('FlagModal', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders create modal when no flag is provided', () => {
    renderWithProviders(
      <FlagModal open={true} onClose={mockOnClose} />
    );

    expect(screen.getByText('Criar Nova Flag')).toBeInTheDocument();
    expect(screen.getByLabelText('Nome')).toBeInTheDocument();
    expect(screen.getByLabelText('Descrição')).toBeInTheDocument();
    expect(screen.getByText('Criar')).toBeInTheDocument();
  });

  it('renders edit modal when flag is provided', () => {
    renderWithProviders(
      <FlagModal open={true} onClose={mockOnClose} flag={mockFlag} />
    );

    expect(screen.getByText('Editar Flag')).toBeInTheDocument();
    expect(screen.getByDisplayValue('new-checkout')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Nova experiência de checkout')).toBeInTheDocument();
    expect(screen.getByText('Salvar')).toBeInTheDocument();
  });

  it('validates required name field', async () => {
    renderWithProviders(
      <FlagModal open={true} onClose={mockOnClose} />
    );

    const nameInput = screen.getByLabelText('Nome');
    const createButton = screen.getByText('Criar');

    fireEvent.change(nameInput, { target: { value: '' } });
    fireEvent.click(createButton);

    await waitFor(() => {
      expect(screen.getByText('Nome é obrigatório')).toBeInTheDocument();
    });
  });

  it('validates name length', async () => {
    renderWithProviders(
      <FlagModal open={true} onClose={mockOnClose} />
    );

    const nameInput = screen.getByLabelText('Nome');
    const createButton = screen.getByText('Criar');

    fireEvent.change(nameInput, { target: { value: 'a'.repeat(51) } });
    fireEvent.click(createButton);

    await waitFor(() => {
      expect(screen.getByText('Nome deve ter no máximo 50 caracteres')).toBeInTheDocument();
    });
  });

  it('validates description length', async () => {
    renderWithProviders(
      <FlagModal open={true} onClose={mockOnClose} />
    );

    const nameInput = screen.getByLabelText('Nome');
    const descriptionInput = screen.getByLabelText('Descrição');
    const createButton = screen.getByText('Criar');

    fireEvent.change(nameInput, { target: { value: 'test-flag' } });
    fireEvent.change(descriptionInput, { target: { value: 'a'.repeat(201) } });
    fireEvent.click(createButton);

    await waitFor(() => {
      expect(screen.getByText('Descrição deve ter no máximo 200 caracteres')).toBeInTheDocument();
    });
  });

  it('calls onClose when cancel button is clicked', () => {
    renderWithProviders(
      <FlagModal open={true} onClose={mockOnClose} />
    );

    const cancelButton = screen.getByText('Cancelar');
    fireEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('submits form with valid data', async () => {
    renderWithProviders(
      <FlagModal open={true} onClose={mockOnClose} />
    );

    const nameInput = screen.getByLabelText('Nome');
    const descriptionInput = screen.getByLabelText('Descrição');
    const createButton = screen.getByText('Criar');

    fireEvent.change(nameInput, { target: { value: 'test-flag' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test description' } });
    fireEvent.click(createButton);

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled();
    });
  });
});
