// import { Default } from '..';

export class PaginatedResponse<T> {
  items!: T[];

  totalCount!: number;
}

export class Pagination {
  limit = 15;
  page!: number;
  totalCount?: number;
}
