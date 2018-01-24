export const RESTORE_SESSION = 'RETRIEVE_SESSION';
export const APP_IS_READY = 'APP_IS_READY';

export const appIsReady = () => {
    return {
        type: APP_IS_READY
    };
}


export const restoreSession = (session, data) => {
    return {
        type: RESTORE_SESSION,
        session,
        data
    };
}
