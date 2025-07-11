export interface JwtPayload {
    roles?: string[];
    [key: string]: any;
}

export type payStackSuccessResponse = {
    "redirecturl": string,
    "trans": string,
    "trxref": string,
    "reference": string,
    "status": "success",
    "message": "Success",
    "response": "Approved"
}