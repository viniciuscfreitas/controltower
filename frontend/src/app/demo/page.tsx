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
  Button,
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

// Componente que só aparece quando a flag está ativa
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
          🚀 Feature Secreta Ativada!
        </Typography>
      </Box>
      <Typography variant="body1">
        Parabéns! Esta é uma funcionalidade experimental que só aparece quando a flag 
        <strong> 'secret-feature-beta'</strong> está ativa no painel de controle.
      </Typography>
      <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
        Esta demonstração mostra como você pode controlar features em tempo real, 
        sem precisar fazer deploy de código.
      </Typography>
    </CardContent>
  </Card>
);

// Componente de exemplo para múltiplas flags
const MultipleFlagsDemo = () => {
  const flags = useFeatureFlags(['feature-a', 'feature-b', 'feature-c']);
  
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          🎛️ Demonstração de Múltiplas Flags
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
          {Object.entries(flags).map(([flagName, isActive]) => (
            <Chip
              key={flagName}
              icon={isActive ? <CheckIcon /> : <CancelIcon />}
              label={`${flagName}: ${isActive ? 'ATIVA' : 'INATIVA'}`}
              color={isActive ? 'success' : 'default'}
              variant={isActive ? 'filled' : 'outlined'}
            />
          ))}
        </Box>
        <Typography variant="body2" color="text.secondary">
          Crie flags com os nomes 'feature-a', 'feature-b' ou 'feature-c' no painel 
          para ver elas aparecerem aqui em tempo real.
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
            🎭 Página de Demonstração
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Esta página demonstra o poder estratégico do ControlTower em ação.
          </Typography>
        </Box>

        {/* Instruções */}
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            📋 Como testar:
          </Typography>
          <ol>
            <li>
              <strong>Crie uma flag:</strong> Vá ao painel de controle e crie uma flag 
              chamada <code>'secret-feature-beta'</code>
            </li>
            <li>
              <strong>Deixe INATIVA:</strong> A feature secreta não deve aparecer abaixo
            </li>
            <li>
              <strong>ATIVA a flag:</strong> Recarregue esta página - a feature deve aparecer!
            </li>
            <li>
              <strong>Teste o "Kill Switch":</strong> Desative a flag e recarregue - 
              a feature desaparece instantaneamente
            </li>
          </ol>
        </Alert>

        {/* Status da Flag */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box display="flex" alignItems="center" gap={2}>
              <Typography variant="h6">
                Status da Flag 'secret-feature-beta':
              </Typography>
              {showSecretFeature ? (
                <Chip
                  icon={<VisibilityIcon />}
                  label="ATIVA"
                  color="success"
                  variant="filled"
                />
              ) : (
                <Chip
                  icon={<VisibilityOffIcon />}
                  label="INATIVA"
                  color="default"
                  variant="outlined"
                />
              )}
            </Box>
          </CardContent>
        </Card>

        {/* Feature Condicional */}
        <Box mb={3}>
          <Typography variant="h5" gutterBottom>
            🎯 Feature Controlada por Flag
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
                  Feature Secreta Ocultada
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ative a flag 'secret-feature-beta' no painel de controle para ver a mágica acontecer!
                </Typography>
              </CardContent>
            </Card>
          )}
        </Box>

        {/* Demonstração de Múltiplas Flags */}
        <Box mb={3}>
          <Typography variant="h5" gutterBottom>
            🎛️ Múltiplas Flags
          </Typography>
          <MultipleFlagsDemo />
        </Box>

        {/* Explicação Técnica */}
        <Card sx={{ backgroundColor: '#f8f9fa' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              🔧 Como Funciona Tecnicamente
            </Typography>
            <Typography variant="body1" paragraph>
              Esta página usa o hook <code>useFeatureFlag()</code> que:
            </Typography>
            <ul>
              <li>
                <strong>Faz uma requisição</strong> para <code>/api/v1/flags/active</code>
              </li>
              <li>
                <strong>Cacheia o resultado</strong> por 1 minuto para performance
              </li>
              <li>
                <strong>Retorna um boolean</strong> indicando se a flag está ativa
              </li>
              <li>
                <strong>Atualiza automaticamente</strong> quando o cache expira
              </li>
            </ul>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              💡 <strong>Dica:</strong> Esta é a mesma lógica que você usaria em qualquer 
              componente React para controlar features condicionalmente.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </ProtectedRoute>
  );
}
