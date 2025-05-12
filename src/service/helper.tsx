export const authorizedHeader = (token: string) => ({
    headers: {
        ...(token ? { "Authorization": "bearer " + token } : {}),
        "Content-Type": 'application/json'
    }
});

