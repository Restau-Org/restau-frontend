import * as actions from '../../actions/manager/ManagerChefAction';

export const initialState = {
    chefs: {},
    loading: false,
    sending: false,
    hasErrors: false,
}
export default function managerChefReducer(state = initialState, action) {
    switch (action.type) {
        case actions.GET_CHEF:
            return { ...state, loading: true };
        case actions.GET_CHEF_SUCCESS:
            return {
                chefs: action.payload,
                loading: false,
                hasErrors: false,
                sending: false,
            }
        case actions.GET_CHEF_FAILURE:
            return { ...state, loading: false, hasErrors: true, sending: false };
        case actions.SEND_CHEF:
            return { ...state, sending: true };
        case actions.SEND_CHEF_SUCCESS:
            return {
                chefs: action.payload,
                loading: false,
                hasErrors: false,
                sending: false,
            };
        case actions.SEND_CHEF_FAILURE:
            return { ...state, loading: false, hasErrors: true, sending: false };
        default:
            return state;
    }
    
}