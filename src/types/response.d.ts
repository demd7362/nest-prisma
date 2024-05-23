export interface ResponseBody<T> {
    message?: string;
    error?: string;
    statusCode: number;
    data?: T;
}
