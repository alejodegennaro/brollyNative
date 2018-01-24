export const POLICY_REQUEST = 'POLICY_REQUEST';
export const POLICY_ERROR = 'POLICY_ERROR';
export const POLICY_SUCCESS = 'POLICY_SUCCESS';
export const UPDATE_DATA = 'UPDATE_DATA';

export const policyHasErrored = () => {
    return {
        type: POLICY_ERROR
    };
}


export const policyRequest = () => {
    return {
        type: POLICY_REQUEST
    };
}


export const policySuccess = (response) => {
    return {
        type: POLICY_SUCCESS,
        response
    };
}

export const updateData = (data) => {
    return {
        type: UPDATE_DATA,
        data
    };
}


export const fetchPolicies = () => {

    let endpoint = 'http:///192.168.1.3:8090/policies';

    return (dispatch,getState) => {

        let token = getState().auth.token;
        let params = { method: 'GET',
           headers: {  'Accept': 'application/json','Content-Type': 'application/json',
                 'Authorization':'bearer '+token }
        };

        dispatch(policyRequest())

        fetch(endpoint,params)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                return response;
            })
            .then((response) => response.json())
            .then((items) =>  dispatch(policySuccess(items)))
            .catch(() => dispatch(policyHasErrored()));
    };
}

