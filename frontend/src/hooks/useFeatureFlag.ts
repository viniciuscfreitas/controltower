import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/api';

/**
 * Hook for checking if a specific feature flag is active.
 * 
 * This hook provides a simple way to conditionally render components
 * or execute logic based on feature flag states.
 * 
 * @param flagName - The name of the feature flag to check
 * @returns boolean indicating if the flag is active
 * 
 * @example
 * ```tsx
 * const showNewFeature = useFeatureFlag('new-feature-beta');
 * 
 * return (
 *   <div>
 *     {showNewFeature && <NewFeatureComponent />}
 *   </div>
 * );
 * ```
 */
export const useFeatureFlag = (flagName: string): boolean => {
  const { data: activeFlags } = useQuery({
    queryKey: ['active-flags'],
    queryFn: () => apiService.getActiveFlags(),
    staleTime: 60000, // 1 minuto - flags não mudam frequentemente
    gcTime: 5 * 60 * 1000, // 5 minutos - mantém cache por mais tempo
    refetchOnWindowFocus: false, // Não refaz requisição ao focar na janela
    retry: 2, // Tenta 2 vezes em caso de erro
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 5000), // Backoff exponencial
  });

  // Retorna true se a flag estiver na lista de flags ativas
  return activeFlags?.includes(flagName) ?? false;
};

/**
 * Hook for checking multiple feature flags at once.
 * 
 * @param flagNames - Array of feature flag names to check
 * @returns Object with flag names as keys and boolean values
 * 
 * @example
 * ```tsx
 * const flags = useFeatureFlags(['feature-a', 'feature-b']);
 * 
 * return (
 *   <div>
 *     {flags['feature-a'] && <ComponentA />}
 *     {flags['feature-b'] && <ComponentB />}
 *   </div>
 * );
 * ```
 */
export const useFeatureFlags = (flagNames: string[]): Record<string, boolean> => {
  const { data: activeFlags } = useQuery({
    queryKey: ['active-flags'],
    queryFn: () => apiService.getActiveFlags(),
    staleTime: 60000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 5000),
  });

  // Cria um objeto com as flags solicitadas
  const result: Record<string, boolean> = {};
  flagNames.forEach(flagName => {
    result[flagName] = activeFlags?.includes(flagName) ?? false;
  });

  return result;
};
