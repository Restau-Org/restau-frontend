import * as actions from '../../actions/manager/ManagerWaitersAction';

export const initialState = {
    waiters: {},
    loading: false,
    sending: false,
    hasErrors: false,
}
export default function managerWaitersReducer(state = initialState, action) {
    switch (action.type) {
        case actions.GET_WAITERS:
            return { ...state, loading: true };
        case actions.GET_WAITERS_SUCCESS:
            return {
                waiters: action.payload,
                loading: false,
                hasErrors: false,
                sending: false,
            }
        case actions.GET_WAITERS_FAILURE:
            return { ...state, loading: false, hasErrors: true, sending: false };
        case actions.SEND_WAITERS:
            return { ...state, sending: true };
        case actions.SEND_WAITERS_SUCCESS:
            return {
                waiters: action.payload,
                loading: false,
                hasErrors: false,
                sending: false,
            };
        case actions.SEND_WAITERS_FAILURE:
            return { ...state, loading: false, hasErrors: true, sending: false };
        default:
            return state;
    }
    
}