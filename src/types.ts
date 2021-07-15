export enum FlashcardStatus {
  NEW = "new",
  GRADUATED = "graduated",
}

export enum FILETREE_TYPES {
  FOLDER = "folder",
  BINDER = "binder",
  STUDY_SET = "study-set",
}

export enum FlashcardQuality {
  REPEAT = "Repeat",
  REMEMBERED = "Remembered",
  EASILY_REMEMBERED = "Easily remembered",
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
  study_set_id: string;
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
  front_blocks: string[];
  back_blocks: string[];
  deck_id: string;
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
  ordering: string[];
  owner_id: string;
  study_set_id: string;
  date_created: string;
  date_modified: string;
}

export interface DeckInterface {
  id: string;
  owner_id: string;
  study_set_id: string;
  date_created: string;
  date_modified: string;
}

export interface StudySetInterface {
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
  date_created: string;
  date_modified: string;
}
export interface FileTreeInterface {
  [instance_id: string]: {
    type: string;
    id: string;
    owner_id: string;
    color: string;
    name: string;
    date_created?: Date;
    date_modified?: Date;
    folder_id?: string;
    binder_id?: string;
    children: FileTreeInterface;
  };
}
