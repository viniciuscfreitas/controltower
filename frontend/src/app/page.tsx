'use client';

import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  AppBar,
  Toolbar,
  Alert,
  IconButton,
} from '@mui/material';
import { Add as AddIcon, Logout as LogoutIcon } from '@mui/icons-material';
import { useFlags } from '@/hooks/useFlags';
import { useAuth } from '@/contexts/AuthContext';
import FlagTable from '@/components/FlagTable';
import FlagModal from '@/components/FlagModal';
import ProtectedRoute from '@/components/ProtectedRoute';
import { FeatureFlag } from '@/types/flag';

export default function Dashboard() {
  console.log('🔧 Dashboard component rendering');
  
  const [flagModal, setFlagModal] = useState<{
    open: boolean;
    flag: FeatureFlag | null;
  }>({
    open: false,
    flag: null,
  });

  console.log('🔧 Calling useFlags hook...');
  const { data: flags = [], isLoading, error } = useFlags();
  console.log('🔧 useFlags result:', { flags, isLoading, error });
  
  const { logout, username } = useAuth();

  const handleCreateFlag = () => {
    setFlagModal({ open: true, flag: null });
  };

  const handleEditFlag = (flag: FeatureFlag) => {
    setFlagModal({ open: true, flag });
  };

  const handleCloseModal = () => {
    setFlagModal({ open: false, flag: null });
  };

  return (
    <ProtectedRoute>
      <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              ControlTower - Feature Flags
            </Typography>
            <Typography variant="body2" sx={{ mr: 2 }}>
              Hello, {username}
            </Typography>
            <IconButton color="inherit" onClick={logout}>
              <LogoutIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h4" component="h1">
              Dashboard
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCreateFlag}
              size="large"
            >
              Create New Flag
            </Button>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Error loading flags: {error.message}
            </Alert>
          )}

          <FlagTable
            flags={flags}
            onEdit={handleEditFlag}
            loading={isLoading}
            error={error?.message}
          />

          <FlagModal
            open={flagModal.open}
            onClose={handleCloseModal}
            flag={flagModal.flag}
          />
        </Container>
    </ProtectedRoute>
  );
}