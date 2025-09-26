'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Alert,
  CircularProgress,
} from '@mui/material';
import { FeatureFlag, CreateFlagRequest } from '@/types/flag';
import { useCreateFlag, useUpdateFlag } from '@/hooks/useFlags';

interface FlagModalProps {
  open: boolean;
  onClose: () => void;
  flag?: FeatureFlag | null;
}

export default function FlagModal({ open, onClose, flag }: FlagModalProps) {
  const [formData, setFormData] = useState<CreateFlagRequest>({
    name: '',
    description: '',
  });
  const [errors, setErrors] = useState<Partial<CreateFlagRequest>>({});

  const createFlagMutation = useCreateFlag();
  const updateFlagMutation = useUpdateFlag();

  const isEditing = !!flag;
  const isLoading = createFlagMutation.isPending || updateFlagMutation.isPending;
  const error = createFlagMutation.error || updateFlagMutation.error;

  useEffect(() => {
    if (flag) {
      setFormData({
        name: flag.name,
        description: flag.description,
      });
    } else {
      setFormData({
        name: '',
        description: '',
      });
    }
    setErrors({});
  }, [flag, open]);

  const validateForm = (): boolean => {
    const newErrors: Partial<CreateFlagRequest> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    } else if (formData.name.length > 50) {
      newErrors.name = 'Nome deve ter no máximo 50 caracteres';
    }

    if (formData.description.length > 200) {
      newErrors.description = 'Descrição deve ter no máximo 200 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      if (isEditing && flag) {
        await updateFlagMutation.mutateAsync({
          id: flag.id,
          flag: formData,
        });
      } else {
        await createFlagMutation.mutateAsync(formData);
      }
      onClose();
    } catch (error) {
      // Error is handled by the mutation
    }
  };

  const handleInputChange = (field: keyof CreateFlagRequest) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value,
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        {isEditing ? 'Editar Flag' : 'Criar Nova Flag'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 1 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error instanceof Error ? error.message : 'Erro ao salvar flag'}
            </Alert>
          )}
          
          <TextField
            fullWidth
            label="Nome"
            value={formData.name}
            onChange={handleInputChange('name')}
            error={!!errors.name}
            helperText={errors.name}
            disabled={isLoading}
            margin="normal"
            required
            inputProps={{ maxLength: 50 }}
          />
          
          <TextField
            fullWidth
            label="Descrição"
            value={formData.description}
            onChange={handleInputChange('description')}
            error={!!errors.description}
            helperText={errors.description}
            disabled={isLoading}
            margin="normal"
            multiline
            rows={3}
            inputProps={{ maxLength: 200 }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={isLoading}
          startIcon={isLoading ? <CircularProgress size={16} /> : null}
        >
          {isEditing ? 'Salvar' : 'Criar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
