import * as actions from '../../actions/manager/ManagerClerksAction';

export const initialState = {
    clerks: {},
    loading: false,
    sending: false,
    hasErrors: false,
}
export default function managerClerksReducer(state = initialState, action) {
    switch (action.type) {
        case actions.GET_CLERKS:
            return { ...state, loading: true };
        case actions.GET_CLERKS_SUCCESS:
            return {
                clerks: action.payload,
                loading: false,
                hasErrors: false,
                sending: false,
            }
        case actions.GET_CLERKS_FAILURE:
            return { ...state, loading: false, hasErrors: true, sending: false };
        case actions.SEND_CLERKS:
            return { ...state, sending: true };
        case actions.SEND_CLERKS_SUCCESS:
            return {
                clerks: action.payload,
                loading: false,
                hasErrors: false,
                sending: false,
            };
        case actions.SEND_CLERKS_FAILURE:
            return { ...state, loading: false, hasErrors: true, sending: false };
        default:
            return state;
    }
    
}