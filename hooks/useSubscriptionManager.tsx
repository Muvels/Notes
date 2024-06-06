// hooks/useSubscriptionManager.ts
import { useQueryClient, useQuery } from '@tanstack/react-query';
import SubscriptionManager from '@/lib/subscriptions';
import useTokenStore from '@/store/tokenStore';
import { getTokenCall } from '@/calls/DocumentCalls';

const useSubscriptionManager = () => {
  const { token } = useTokenStore();

  useQuery({
    queryKey: ['subscriptionManager', token],
    queryFn: async () => {
      if (!token || token === "") {
        const subscriptionManager = SubscriptionManager.initializeSubscriptions()
        return subscriptionManager;
      }
      return null;
    },
    enabled: !token,
    staleTime: Infinity,
  });
};

export default useSubscriptionManager;
