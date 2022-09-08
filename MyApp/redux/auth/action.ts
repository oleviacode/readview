export function fetchUser() {
    return {
        type: 'CHANGE_NAME' as const
    }
}

export type FetchUserAction = ReturnType<typeof fetchUser>

export type AuthActions = FetchUserAction 