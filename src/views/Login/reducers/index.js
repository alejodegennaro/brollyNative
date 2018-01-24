import * as actionTypes from '../actions';
import {RESTORE_SESSION} from '../../../actions';
import {SecureStore} from 'expo'

const authSuccess = (state, action) => {
    SecureStore.setItemAsync('user',  JSON.stringify(action.response))
    return {...state, isLoggedIn: true, 
                      token: action.response.token,
                      username: action.response.username,
            }
}

const authRestore = (state, action) => {
    return {...state, isLoggedIn: true, 
                      token: action.session.token,
                      username: action.session.username,
            }
}

const authHasErrored = (state, action) => {
    return {...state, hasErrored: true, isLoggedIn: false, username:'' }
}

const authLogout = (state, action) => {
    SecureStore.deleteItemAsync('user');
    let newState = {...state, ...initialState}
    return newState;
}


const initialState = {
    token: '',
    username: '',
    hasErrored: false,
    isLoggedIn: false,
};


const ACTION_HANDLERS = {
    [actionTypes.LOGIN_SUCCESS]: (state, action) => authSuccess(state,action),
    [actionTypes.LOGIN_ERROR] : (state, action) => authHasErrored(state,action),
    [actionTypes.LOGOUT] : (state, action) => authLogout(state,action),
    [RESTORE_SESSION] : (state, action) => authRestore(state,action),
};

export default (state = initialState, action) => {
    const handler = ACTION_HANDLERS[action.type]
    const resultState = handler ? handler(state, action) : state
    return resultState
};
