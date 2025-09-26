import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import { CreateFlagRequest, UpdateFlagRequest } from '@/types/flag';

export const useFlags = () => {
  return useQuery({
    queryKey: ['flags'],
    queryFn: apiService.getAllFlags,
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
    mutationFn: ({ id, enabled }: { id: number; enabled: boolean }) =>
      apiService.toggleFlag(id, enabled),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flags'] });
    },
  });
};
