'use client';

import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  Alert,
} from '@mui/material';
import { 
  RocketLaunch as RocketIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  CheckCircle as CheckIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';
import { useFeatureFlag, useFeatureFlags } from '@/hooks/useFeatureFlag';
import ProtectedRoute from '@/components/ProtectedRoute';

const SecretFeature = () => (
  <Card sx={{ 
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    color: 'white',
    mb: 2,
    animation: 'pulse 2s infinite'
  }}>
    <CardContent>
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <RocketIcon />
        <Typography variant="h6" component="h2">
          🚀 Secret Feature Activated!
        </Typography>
      </Box>
      <Typography variant="body1">
        Congratulations! This is an experimental feature that only appears when the flag 
        <strong> secret-feature-beta</strong> is active in the control panel.
      </Typography>
      <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
        This demonstration shows how you can control features in real-time, 
        without needing to deploy code.
      </Typography>
    </CardContent>
  </Card>
);

const MultipleFlagsDemo = () => {
  const flags = useFeatureFlags(['feature-a', 'feature-b', 'feature-c']);
  
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          🎛️ Multiple Flags Demonstration
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
          {Object.entries(flags).map(([flagName, isActive]) => (
            <Chip
              key={flagName}
              icon={isActive ? <CheckIcon /> : <CancelIcon />}
              label={`${flagName}: ${isActive ? 'ACTIVE' : 'INACTIVE'}`}
              color={isActive ? 'success' : 'default'}
              variant={isActive ? 'filled' : 'outlined'}
            />
          ))}
        </Box>
        <Typography variant="body2" color="text.secondary">
          Create flags with names feature-a, feature-b or feature-c in the panel 
          to see them appear here in real-time.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default function DemoPage() {
  const showSecretFeature = useFeatureFlag('secret-feature-beta');

  return (
    <ProtectedRoute>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box mb={4}>
          <Typography variant="h3" component="h1" gutterBottom>
            🎭 Demo Page
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            This page demonstrates the strategic power of ControlTower in action.
          </Typography>
        </Box>

        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            📋 How to test:
          </Typography>
          <ol>
            <li>
              <strong>Create a flag:</strong> Go to the control panel and create a flag 
              named <code>secret-feature-beta</code>
            </li>
            <li>
              <strong>Leave it INACTIVE:</strong> The secret feature should not appear below
            </li>
            <li>
              <strong>ACTIVATE the flag:</strong> Reload this page - the feature should appear!
            </li>
            <li>
              <strong>Test the Kill Switch:</strong> Deactivate the flag and reload - 
              the feature disappears instantly
            </li>
          </ol>
        </Alert>

        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box display="flex" alignItems="center" gap={2}>
              <Typography variant="h6">
                Status of Flag secret-feature-beta:
              </Typography>
              {showSecretFeature ? (
                <Chip
                  icon={<VisibilityIcon />}
                  label="ACTIVE"
                  color="success"
                  variant="filled"
                />
              ) : (
                <Chip
                  icon={<VisibilityOffIcon />}
                  label="INACTIVE"
                  color="default"
                  variant="outlined"
                />
              )}
            </Box>
          </CardContent>
        </Card>

        <Box mb={3}>
          <Typography variant="h5" gutterBottom>
            🎯 Feature Controlled by Flag
          </Typography>
          {showSecretFeature ? (
            <SecretFeature />
          ) : (
            <Card sx={{ 
              border: '2px dashed #ccc',
              backgroundColor: '#f9f9f9',
              textAlign: 'center',
              py: 4
            }}>
              <CardContent>
                <VisibilityOffIcon sx={{ fontSize: 48, color: '#ccc', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  Secret Feature Hidden
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Activate the secret-feature-beta flag in the control panel to see the magic happen!
                </Typography>
              </CardContent>
            </Card>
          )}
        </Box>

        <Box mb={3}>
          <Typography variant="h5" gutterBottom>
            🎛️ Multiple Flags
          </Typography>
          <MultipleFlagsDemo />
        </Box>

        <Card sx={{ backgroundColor: '#f8f9fa' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              🔧 How It Works Technically
            </Typography>
            <Typography variant="body1" paragraph>
              This page uses the useFeatureFlag() hook that:
            </Typography>
            <ul>
              <li>
                <strong>Makes a request</strong> to <code>/api/v1/flags/active</code>
              </li>
              <li>
                <strong>Caches the result</strong> for 1 minute for performance
              </li>
              <li>
                <strong>Returns a boolean</strong> indicating if the flag is active
              </li>
              <li>
                <strong>Updates automatically</strong> when the cache expires
              </li>
            </ul>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              💡 <strong>Tip:</strong> This is the same logic you would use in any 
              React component to conditionally control features.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </ProtectedRoute>
  );
}