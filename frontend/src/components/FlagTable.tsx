'use client';

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
  IconButton,
  Chip,
  Box,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { FeatureFlag } from '@/types/flag';
import { useToggleFlag, useDeleteFlag } from '@/hooks/useFlags';
import ConfirmationModal from './ConfirmationModal';

interface FlagTableProps {
  flags: FeatureFlag[];
  onEdit: (flag: FeatureFlag) => void;
  loading?: boolean;
  error?: string;
}

export default function FlagTable({ flags, onEdit, loading, error }: FlagTableProps) {
  const [confirmationModal, setConfirmationModal] = useState<{
    open: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({
    open: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });

  const toggleFlagMutation = useToggleFlag();
  const deleteFlagMutation = useDeleteFlag();

  const handleToggleFlag = (flag: FeatureFlag) => {
    const action = flag.enabled ? 'DEACTIVATE' : 'ACTIVATE';
    setConfirmationModal({
      open: true,
      title: `Confirm ${action} Flag`,
      message: `Are you sure you want to ${action.toLowerCase()} the flag '${flag.name}'?`,
      onConfirm: () => {
        toggleFlagMutation.mutate({
          id: flag.id,
          enabled: !flag.enabled,
        });
        setConfirmationModal(prev => ({ ...prev, open: false }));
      },
    });
  };

  const handleDeleteFlag = (flag: FeatureFlag) => {
    setConfirmationModal({
      open: true,
      title: 'Confirm Deletion',
      message: `Are you sure you want to delete the flag '${flag.name}'? This action cannot be undone.`,
      onConfirm: () => {
        deleteFlagMutation.mutate(flag.id);
        setConfirmationModal(prev => ({ ...prev, open: false }));
      },
    });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        Error loading flags: {error}
      </Alert>
    );
  }

  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {flags.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography variant="body2" color="text.secondary">
                    No flags found
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              flags.map((flag) => (
                <TableRow key={flag.id} hover>
                  <TableCell>
                    <Typography variant="body2" fontWeight="medium">
                      {flag.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {flag.description}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                      <Switch
                        checked={flag.enabled}
                        onChange={() => handleToggleFlag(flag)}
                        disabled={toggleFlagMutation.isPending}
                        color="success"
                      />
                      <Chip
                        label={flag.enabled ? 'ACTIVE' : 'INACTIVE'}
                        color={flag.enabled ? 'success' : 'default'}
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Box display="flex" gap={1} justifyContent="center">
                      <IconButton
                        size="small"
                        onClick={() => onEdit(flag)}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteFlag(flag)}
                        color="error"
                        disabled={deleteFlagMutation.isPending}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <ConfirmationModal
        open={confirmationModal.open}
        title={confirmationModal.title}
        message={confirmationModal.message}
        onConfirm={confirmationModal.onConfirm}
        onCancel={() => setConfirmationModal(prev => ({ ...prev, open: false }))}
      />
    </>
  );
}
