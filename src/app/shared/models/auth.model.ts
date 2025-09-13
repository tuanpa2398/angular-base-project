export type LoginRequest = {
    username: string,
    password: string
}

export type AppUser = {
    id: string
}

export type LoginResponse = {
    user: AppUser,
    refreshToken: string,
    accessToken: string
}

export type RefreshTokenResponse = {
    accessToken: string
}