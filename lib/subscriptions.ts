// subscriptions.js
import useDocumentStore from '@/store/store';
import { pbInstance } from './initialize';
import cookieCutter from "cookie-cutter";


const pb = pbInstance();

export const initializeSubscriptions = () => {
  const { documents, deleteDocument, patchDocument, createDocument } = useDocumentStore.getState();

  // Subscribe to changes in the 'documents' collection
  pb.authStore.loadFromCookie(cookieCutter.get("pb_auth") as string || "")
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
