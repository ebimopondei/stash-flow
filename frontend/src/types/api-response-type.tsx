import type { User } from "./user"

export type loginProps = {
    token: string,
    refreshToken: string,
    user: User | null
}

export type AuthResponse = {
    success: boolean,
    message: string,
    data: { 
        token: string,
        refreshToken: string, 
        user: User | null
    }
}

export type LoginResponse = AuthResponse
export type RefreshTokenResponse = AuthResponse
export type SignupResponse = AuthResponse