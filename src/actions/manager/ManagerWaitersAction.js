import axios from 'axios';
import authHeader from '../../services/auth-header';
import { toast } from 'react-toastify'

// Create Redux action types
export const GET_WAITERS = "GET_WAITERS";
export const GET_WAITERS_SUCCESS = "GET_WAITERS_SUCCESS";
export const GET_WAITERS_FAILURE = "GET_WAITERS_FAILURE";
export const SEND_WAITERS = "SEND_WAITERS";
export const SEND_WAITERS_SUCCESS = "SEND_WAITERS_SUCCESS";
export const SEND_WAITERS_FAILURE = "SEND_WAITERS_FAILURE";

const ENDPOINT = import.meta.env.VITE_REACT_APP_BASE_API_URL;


// Create Redux action creators that return an action
export const getWaiters = () => ({
    type: GET_WAITERS,
});

export const getWaitersSuccess = (Waiters) => ({
    type: GET_WAITERS_SUCCESS,
    payload: Waiters,
});

export const getWaitersFailure = () => ({
    type: GET_WAITERS_FAILURE,
});

export const sendWaiters = () => ({
    type: SEND_WAITERS,
});

export const sendWaitersSuccess = () => ({
    type: SEND_WAITERS_SUCCESS,
});

export const sendWaitersFailure = () => ({
    type: SEND_WAITERS_FAILURE,
});


export function fetchWaiters(page = 0, searchValues = { name: null },status="Active") {
    let limit = 5;
    return async (dispatch, getState) => {
        dispatch(getWaiters());
        try {
            const url = `/waiters/my-waiters?limit=${limit}&page=${page}&status=${status.toUpperCase()}`;
            const FilterUrl = `/waiters/my-waiters?&name=${searchValues.name}&status=${status.toUpperCase()}&limit=${limit}&page=${page}`;


            let useSearch =
                searchValues.name

            let waitersFromBackend = await axios.get(`${ENDPOINT}${useSearch ? FilterUrl : url}`, {
                headers: authHeader(),
            });
            waitersFromBackend = waitersFromBackend.data.data;
            if (useSearch) {
                waitersFromBackend = { ...waitersFromBackend, searchValues };
            }
            dispatch(getWaitersSuccess(waitersFromBackend));
        } catch (error) {
            dispatch(getWaitersFailure());
        }
    };
}


async function reloadWaiters(dispatch, getState) {
    let currentPage = getState().managerWaiters.number;
    await dispatch(fetchWaiters(currentPage));
}
export function dispatchReloadWaiters() {
    return async (dispatch, getState) => {
        reloadWaiters(dispatch, getState);
    };
}

export async function postWaiter(dataToPost) {
    try {
        const url = `/waiters/register`;
        let response = await axios.post(`${ENDPOINT}${url}`, dataToPost, {
            headers: authHeader(),
        });
        toast.success("Waiter added successfully");
        return { success: true, data: response.data }
    } catch (err) {
        toast.error(err?.response?.data?.message || "Adding Waiter failed")
        return { sucess: false, err }
    }

}

