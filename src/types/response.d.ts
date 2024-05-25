export interface ResponseBody {
    message?: string;
    error?: string;
    statusCode: number;
    data?: object;
}

export interface Pagination<T> {
    data: T | T[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}
