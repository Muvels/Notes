// hooks/useUser.ts
import { useQuery } from '@tanstack/react-query';

export const useUser = () => {
  const query = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await fetch('/api/view/user', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    enabled: true, // This can be omitted since true is the default value
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
  };
};
