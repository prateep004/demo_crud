export interface SuccessfullyError {
    message: string;
}

export const mapSuccessfully = (message = "Successfully"): SuccessfullyError => {
    return {
        message: message
    }

}