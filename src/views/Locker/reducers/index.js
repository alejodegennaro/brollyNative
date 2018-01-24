import * as actionTypes from '../actions';
import {LOGOUT} from '../../Login/actions';
import {RESTORE_SESSION} from '../../../actions';
import {SecureStore} from 'expo'

const policySuccess = (state, action) => {
    SecureStore.setItemAsync('policy',  JSON.stringify(action.response))
    return {...state, isLoading: false, 
                      isReady:true,
                      policies: action.response.policies,
            }
}

const policyUpdate = (state, action) => {
    return {...state, isReady: true, 
                      policies: action.data.policies,
            }
}

const policyHasErrored = (state, action) => {
    return {...state, hasErrored: true, isReady: false, isLoading:false }
}

const policyRequest = (state, action) => {
    return {...state, isLoading:true }
}

const appLogout = (state, action) => {
    SecureStore.deleteItemAsync('policy');
    let newState = {...state, ...initialState}
    return newState;
}

const initialState = {
    policies: [],
    hasErrored: false,
    isLoading: false,
    isReady: false
};


const ACTION_HANDLERS = {
    [actionTypes.POLICY_SUCCESS]: (state, action) => policySuccess(state,action),
    [actionTypes.POLICY_ERROR] : (state, action) => policyHasErrored(state,action),
    [actionTypes.POLICY_REQUEST] : (state, action) => policyRequest(state,action),
    [RESTORE_SESSION] : (state, action) => policyUpdate(state,action),
    [LOGOUT] : (state, action) => appLogout(state,action),
};

export default (state = initialState, action) => {
    const handler = ACTION_HANDLERS[action.type]
    const resultState = handler ? handler(state, action) : state
    return resultState
};
