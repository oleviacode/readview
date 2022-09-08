export function changeName() {
    return {
        type: 'CHANGE_NAME' as const
    }
}

export type ChangeNameAction = ReturnType<typeof changeName>

export type AuthActions = ChangeNameAction 