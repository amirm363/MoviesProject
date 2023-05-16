

export const isUserAuthenticated = (): boolean => {
    const isAuthenticated: string | null = sessionStorage.getItem('connectedUser')
    if (isAuthenticated) {
        return true;
    }
    return false;

}

export const getAuthenticationToken = () => {
    const connectedUser = sessionStorage.getItem("connectedUser")
    return {
        token: connectedUser ? JSON.parse(connectedUser).accessToken : null,
        userName: connectedUser ? JSON.parse(connectedUser).userName : null
    }
}