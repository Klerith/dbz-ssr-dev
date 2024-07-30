export interface DragonBallPaginated {
  items: BasicCharacter[];
  meta: PaginationMeta;
  links: Links;
}

export interface BasicCharacter {
  id: number;
  name: string;
  ki: string;
  maxKi: string;
  race: string;
  gender: Gender;
  description: string;
  image: string;
  affiliation: string;
  deletedAt: null;
}

export enum Gender {
  Female = 'Female',
  Male = 'Male',
}

export interface Links {
  first: string;
  previous: string;
  next: string;
  last: string;
}

export interface PaginationMeta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}
