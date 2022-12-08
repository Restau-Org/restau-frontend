import * as actions from '../../actions/admin/AdminRestaurantsAction';

export const initialState = {
    restaurants: {},
    loading: false,
    sending: false,
    hasErrors: false,
}
export default function adminRestaurantsReducer(state = initialState, action) {
    switch (action.type) {
        case actions.GET_RESTAURANTS:
            return { ...state, loading: true };
        case actions.GET_RESTAURANTS_SUCCESS:
            return {
                restaurants: action.payload,
                loading: false,
                hasErrors: false,
                sending: false,
            }
        case actions.GET_RESTAURANTS_FAILURE:
            return { ...state, loading: false, hasErrors: true, sending: false };
        case actions.SEND_RESTAURANTS:
            return { ...state, sending: true };
        case actions.SEND_RESTAURANTS_SUCCESS:
            return {
                restaurants: action.payload,
                loading: false,
                hasErrors: false,
                sending: false,
            };
        case actions.SEND_RESTAURANTS_FAILURE:
            return { ...state, loading: false, hasErrors: true, sending: false };
        default:
            return state;
    }
    
}