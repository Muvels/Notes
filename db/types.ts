export interface documents {
  title: string
  userId: string[] //pocketbaseId
  isArchived?: boolean,
  parentDocument?: string,
  content?: string,
  coverImage?: File,
  icon?: string,
  isPublished: boolean,
}

export interface FrontendDocuments {
  title: string
  userId?: string[] //pocketbaseId
  isArchived?: boolean,
  parentDocument?: string,
  content?: string,
  coverImage?: File,
  icon?: string,
  isPublished: boolean,
}

export interface updatedDocument {
  title?: string
  userId?: string[] //pocketbaseId
  isArchived?: boolean,
  parentDocument?: string,
  content?: string,
  coverImage?: File | null,
  icon?: string,
  isPublished?: boolean,
}

export interface FileObject {
   file: File,
   document: string,
   contentId: string
}

// Options

export interface FilterOptions {
  filter?: string,
  expand?: string,
  sort?: string,
}

export interface FileBucket {
  bucket: string,
  record: string,
  identifier: string
}