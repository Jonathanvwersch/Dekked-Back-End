export enum FlashcardStatus {
  NEW = "new",
  GRADUATED = "graduated",
}

export interface BinderInterface {
  id: string;
  owner_id: string;
  folder_id: string;
  name: string;
  color: string;
  date_created: Date;
  date_modified: Date;
}

export interface BlockInterface {
  id: string;
  draft_key: string;
  parent_id: string;
  content: string;
}

export interface FlashcardInterface {
  id: string;
  owner_id: string;
  study_pack_id: string;
  back_ordering: string[];
  front_ordering: string[];
  date_created: Date;
  date_modified: Date;
  block_link?: string;
  status?: FlashcardStatus;
  quality?: number;
  ease_factor?: number;
  failed_attempts?: number;
  interval?: number;
}

export interface FolderInterface {
  id: string;
  owner_id: string;
  name: string;
  date_created: Date;
  date_modified: Date;
  color: string;
}

export interface PageInterface {
  id: string;
  title: string;
  ordering: string[];
  owner_id: string;
  study_pack_id: string;
}

export interface StudyPackInterface {
  id: string;
  owner_id: string;
  binder_id: string;
  name: string;
  color: string;
  date_created: Date;
  date_modified: Date;
  folder_id: string;
}

export interface UserInterface {
  id: string;
  email_address: string;
  first_name: string;
  last_name: string;
  password: string;
}

export interface FileTreeInterface {
  [instance_id: string]: {
    type: string;
    id: string;
    owner_id: string;
    color: string;
    name: string;
    children: FileTreeInterface;
    date_created?: Date;
    date_modified?: Date;
    folder_id?: string;
    binder_id?: string;
  };
}

export enum FILETREE_TYPES {
  FOLDER = "folder",
  BINDER = "binder",
  STUDY_PACK = "study_pack",
}
