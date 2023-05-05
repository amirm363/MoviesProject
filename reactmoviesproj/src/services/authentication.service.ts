

export const isUserAuthenticated = (): boolean => {
    const isAuthenticated: string | null = sessionStorage.getItem('connectedUser')
    if (isAuthenticated) {
        return true;
    }
    return false;

}