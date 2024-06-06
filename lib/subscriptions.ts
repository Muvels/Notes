// lib/subscriptions.ts
import useDocumentStore from '@/store/store';
import { pbInstance } from './initialize';
import { getTokenCall } from '@/calls/DocumentCalls';

class SubscriptionManager {
  
  public static async initializeSubscriptions() {
    const token = await getTokenCall();
    const pb = pbInstance();
    const { deleteDocument, patchDocument, createDocument } = useDocumentStore.getState();
    console.log("CREATE NEW SUBSCRIPTION", token);

    pb.authStore.loadFromCookie(token);
      pb.collection('documents').subscribe('*', (e: any) => {
        const { action, record } = e;
        console.log(e);
        if (action === 'update') {
          patchDocument(record.id, record);
        }
        if (action === 'delete') {
          deleteDocument(record.id);
        }
        if (action === 'create') {
          createDocument(record);
        }
      });
  }
}

export default SubscriptionManager;
