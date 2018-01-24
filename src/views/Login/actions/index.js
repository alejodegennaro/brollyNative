export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT = 'LOGOUT';
export const RETRIEVE_SESSION = 'RETRIEVE_SESSION';
export const APP_IS_READY = 'APP_IS_READY';

export const appIsReady = () => {
    return {
        type: APP_IS_READY
    };
}


export const loginHasErrored = () => {
    return {
        type: LOGIN_ERROR
    };
}


export const loginSuccess = (response) => {
    return {
        type: LOGIN_SUCCESS,
        response
    };
}


export const logoutSuccess = () => {
    return {
        type: LOGOUT
    };
}

export const retrieveSession = (session) => {
    return {
        type: RETRIEVE_SESSION,
        session
    };
}


export const logout = () => {

    let endpoint = 'http:///192.168.1.3:8090/logout';

    return (dispatch,getState) => {

        let token = getState().auth.token;
        let params = { method: 'GET',
           headers: {  'Accept': 'application/json','Content-Type': 'application/json',
                 'Authorization':'bearer '+token }
        };

        fetch(endpoint,params)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                return response;
            })
            .then((response) => response.json())
            .then(() =>  dispatch(logoutSuccess()))
            .catch(() => dispatch(loginHasErrored()));
    };
}


export const login = (userData) => {

    let endpoint = 'http:///192.168.1.3:8090/login';

    return (dispatch) => {

        fetch(endpoint,{
                method: 'POST',
                body: JSON.stringify(userData),
                headers: {"Content-Type": "application/json"}
              })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                return response;
            })
            .then((response) => response.json())
            .then((response) =>  dispatch(loginSuccess(response)))
            .catch(() => dispatch(loginHasErrored()));
    };
}

