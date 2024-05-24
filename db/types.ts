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
  coverImage?: File,
  icon?: string,
  isPublished?: boolean,
}

// Options

export interface FilterOptions {
  filter?: string,
  expand?: string,
  sort?: string,
}