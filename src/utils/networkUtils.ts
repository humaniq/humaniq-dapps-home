export const isNotAuthorized = (code: number) => code === 401
export const isNotAllowed = (code: number) => code === 403
export const isOk = (code: number) => code >= 200 && code <= 202