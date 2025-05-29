export type loginProps = {
    token: string,
    refreshToken: string
}

export type AuthResponse = {
    success: boolean,
    message: string,
    data: { 
        token: string,
        refreshToken: string, 
        roles: string[],
    }
}

export type LoginResponse = AuthResponse
export type RefreshTokenResponse = AuthResponse
export type SignupResponse = AuthResponse