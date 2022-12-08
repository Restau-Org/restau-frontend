import * as actions from '../../actions/admin/AdminManagersAction';

export const initialState = {
    managers: {},
    loading: false,
    sending: false,
    hasErrors: false,
}
export default function adminManagersReducer(state = initialState, action) {
    switch (action.type) {
        case actions.GET_MANAGERS:
            return { ...state, loading: true };
        case actions.GET_MANAGERS_SUCCESS:
            return {
                managers: action.payload,
                loading: false,
                hasErrors: false,
                sending: false,
            }
        case actions.GET_MANAGERS_FAILURE:
            return { ...state, loading: false, hasErrors: true, sending: false };
        case actions.SEND_MANAGERS:
            return { ...state, sending: true };
        case actions.SEND_MANAGERS_SUCCESS:
            return {
                managers: action.payload,
                loading: false,
                hasErrors: false,
                sending: false,
            };
        case actions.SEND_MANAGERS_FAILURE:
            return { ...state, loading: false, hasErrors: true, sending: false };
        default:
            return state;
    }
    
}