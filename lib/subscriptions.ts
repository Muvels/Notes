import useDocumentStore from '@/store/store';
import { pbInstance } from './initialize';
const pb = pbInstance();

export const initializeSubscriptions = (token: string) => {
  const { deleteDocument, patchDocument, createDocument } = useDocumentStore.getState();

  // Subscribe to changes in the 'documents' collection
  pb.authStore.loadFromCookie(token);
  pb.collection('documents').subscribe('*', function (e) {
    const { action, record } = e;
    console.log(e);
    if (action === 'update') {
        patchDocument(record.id, record)
    }
    if (action === 'delete') {
      deleteDocument(record.id)
    }
    if (action === 'create') {
      createDocument(record);
    }
  });
};

// cookieCutter.get("pb_auth") as string || ""