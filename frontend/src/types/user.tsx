import type { ShareableLinks } from "./form"

export interface User {
    id?: string,
    username: string,
    email: string,
    phone?: string,
    password_hash?: string,
    avatar_url?: string,
    firstname: string,
    lastname: string,
    password?: string,
    address?: string,
    country?: string,
    dob?: string,
    vibe_score?: number,
    account_type?: string,
    is_verified?: boolean,
    createdAt?: Date,
    updatedAt?: Date,
}

export interface PublicUserProfile {
    id?: string,
    username: string,
    email: string,
    phone?: string,
    password_hash?: string,
    avatar_url?: string,
    firstname: string,
    lastname: string,
    password?: string,
    address?: string,
    country?: string,
    dob?: string,
    vibe_score?: number,
    account_type?: string,
    is_verified?: boolean,
    createdAt?: Date,
    updatedAt?: Date,
    links: ShareableLinks[]
}

export interface UserResponse{
    success: boolean,
    message: string,
    data: User | null
}

export interface PublicUserResponse{
    success: boolean,
    message: string,
    data: PublicUserProfile | null
}