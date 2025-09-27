import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import { CreateFlagRequest, UpdateFlagRequest } from '@/types/flag';

export const useFlags = () => {
  console.log('🔧 useFlags hook called');
  console.log('🔧 apiService exists:', !!apiService);
  console.log('🔧 apiService type:', typeof apiService);
  
  if (!apiService) {
    console.error('❌ apiService is undefined in useFlags!');
    console.trace('Stack trace:');
  }
  
  return useQuery({
    queryKey: ['flags'],
    queryFn: () => {
      console.log('🔧 useFlags queryFn called');
      if (!apiService) {
        console.error('❌ apiService is undefined in queryFn!');
        throw new Error('API service is not available');
      }
      return apiService.getAllFlags();
    },
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
