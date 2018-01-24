import * as actionTypes from '../actions';


const appIsReady = (state, action) => {
    return {...state, isReady: true }
}


const initialState = {
    isReady: false
};


const ACTION_HANDLERS = {
    [actionTypes.APP_IS_READY]: (state, action) => appIsReady(state,action),
};

export default (state = initialState, action) => {
    const handler = ACTION_HANDLERS[action.type]
    const resultState = handler ? handler(state, action) : state
    return resultState
};
