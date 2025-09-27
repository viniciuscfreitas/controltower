import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import { CreateFlagRequest, UpdateFlagRequest } from '@/types/flag';

export const useFlags = () => {
  return useQuery({
    queryKey: ['flags'],
    queryFn: () => {
      if (!apiService) {
        throw new Error('API service is not available');
      }
      return apiService.getAllFlags();
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
    refetchOnWindowFocus: false,
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useCreateFlag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (flag: CreateFlagRequest) => apiService.createFlag(flag),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flags'] });
    },
  });
};

export const useUpdateFlag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, flag }: { id: number; flag: UpdateFlagRequest }) =>
      apiService.updateFlag(id, flag),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flags'] });
    },
  });
};

export const useDeleteFlag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => apiService.deleteFlag(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flags'] });
    },
  });
};

export const useToggleFlag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => apiService.toggleFlag(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flags'] });
    },
  });
};
