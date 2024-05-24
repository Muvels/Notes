import { FilterOptions,  FrontendDocuments, updatedDocument } from "@/db/types";

export const postDocumentCall = async (data: {title: string, parentDocument?: string}) => {
    
    const body : FrontendDocuments = {
        title: data.title,
        isPublished: false,
        parentDocument: data.parentDocument,
        userId: []
    }
    const response = await fetch("/api/documents", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body) // body data type must match "Content-Type" header
      });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
}

export const getDocumentCall = async (filters: FilterOptions) => {
  const response = await fetch("/api/documents", {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        ...filters
      },
    });

  if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
  }


  
  return await response.json();
}

export const getOneDocumentCall = async (id: string) => {
  const response = await fetch("/api/document", {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        document: id
      },
    });

  if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

export const patchDocumentCall = async (id: string, data: updatedDocument) => {
  
  // Append all fields from the data object to the FormData
  // for (const key in data) {
  //   if (data.hasOwnProperty(key)) {
  //     if (key === 'coverImage' && data[key]) {
  //       // Append the file separately
  //       formData.append(key, data[key]);
  //     } else {
  //       formData.append(key, data[key]);
  //     }
  //   }
  // }
  const formData = new FormData();

  formData.append('id', id);
  if (data.title) formData.append('title', data.title);
  if (data.userId) formData.append('userId', JSON.stringify(data.userId));
  if ('isArchived' in data) formData.append('isArchived', data.isArchived);
  if (data.parentDocument) formData.append('parentDocument', data.parentDocument);
  if (data.content) formData.append('content', data.content);
  if (data.coverImage) formData.append('coverImage', data.coverImage);
  if (data.icon) formData.append('icon', data.icon);
  if ('isPublished' in data) formData.append('isPublished', data.isPublished);

  const response = await fetch("/api/document", {
    method: 'PATCH',
      body: formData // body data type must match "Content-Type" header
    });

  if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return await response.json();
}

export const deleteDocumentCall = async (id: string) => {
    
  const body : any = { id }
  const response = await fetch("/api/document", {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body) // body data type must match "Content-Type" header
    });

  if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
  } 
  return true;
}