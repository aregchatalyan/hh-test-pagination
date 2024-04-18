export interface User {
  id: number;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  updatedAt: Date;
}

export interface Meta {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface Data {
  statusCode: number;
  users: User[],
  meta?: Meta
}

export interface Query {
  page: number;
  take?: number;
  order?: 'ASC' | 'DESC';
}
