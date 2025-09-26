'use client';

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';
import { Warning as WarningIcon } from '@mui/icons-material';

interface ConfirmationModalProps {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmationModal({
  open,
  title,
  message,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={1}>
          <WarningIcon color="warning" />
          {title}
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          {message}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="inherit">
          Cancelar
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
