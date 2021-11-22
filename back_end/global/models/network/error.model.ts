export interface NetworkError {
    error: {
        code?: string;
        errno?: string;
        message?: string;
        name: string;
    }
}

export const mapNetworkError = (error): NetworkError => {
    return {
        error: {
            code: error?.code,
            errno: error?.errno,
            message: error?.message,
            name: error?.name,
        }
    }

}

export class CustomNetworkError {
    error;
    constructor(error: NetworkError) {
        this.error = { ...error?.error };
    }
}