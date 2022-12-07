import axios from 'axios';
import authHeader from '../services/auth-header';
import { toast } from 'react-toastify'

// Create Redux action types
export const GET_MANAGERS = "GET_MANAGERS";
export const GET_MANAGERS_SUCCESS = "GET_MANAGERS_SUCCESS";
export const GET_MANAGERS_FAILURE = "GET_MANAGERS_FAILURE";
export const SEND_MANAGERS = "SEND_MANAGERS";
export const SEND_MANAGERS_SUCCESS = "SEND_MANAGERS_SUCCESS";
export const SEND_MANAGERS_FAILURE = "SEND_MANAGERS_FAILURE";

const ENDPOINT = import.meta.env.VITE_REACT_APP_BASE_API_URL;


// Create Redux action creators that return an action
export const getManagers = () => ({
    type: GET_MANAGERS,
});

export const getManagersSuccess = (Managers) => ({
    type: GET_MANAGERS_SUCCESS,
    payload: Managers,
});

export const getManagersFailure = () => ({
    type: GET_MANAGERS_FAILURE,
});

export const sendManagers = () => ({
    type: SEND_MANAGERS,
});

export const sendManagersSuccess = () => ({
    type: SEND_MANAGERS_SUCCESS,
});

export const sendManagersFailure = () => ({
    type: SEND_MANAGERS_FAILURE,
});


export function fetchManagers(page = 0, searchValues = { name: null },status="Active") {
    let limit = 5;
    return async (dispatch, getState) => {
        dispatch(getManagers());
        try {
            const url = `/managers/search?limit=${limit}&page=${page}&status=${status.toUpperCase()}`;
            const FilterUrl = `/managers/search?&name=${searchValues.name}&status=${status.toUpperCase()}&limit=${limit}&page=${page}`;


            let useSearch =
                searchValues.name

            let managersFromBackend = await axios.get(`${ENDPOINT}${useSearch ? FilterUrl : url}`, {
                headers: authHeader(),
            });
            managersFromBackend = managersFromBackend.data.data;
            if (useSearch) {
                managersFromBackend = { ...managersFromBackend, searchValues };
            }
            dispatch(getManagersSuccess(managersFromBackend));
        } catch (error) {
            dispatch(getManagersFailure());
        }
    };
}


async function reloadManagers(dispatch, getState) {
    let currentPage = getState().adminManagers.number;
    await dispatch(fetchManagers(currentPage));
}
export function dispatchReloadManagers() {
    return async (dispatch, getState) => {
        reloadManagers(dispatch, getState);
    };
}

export async function postManager(dataToPost) {
    try {
        const url = `/managers/register`;
        let response = await axios.post(`${ENDPOINT}${url}`, dataToPost, {
            headers: authHeader(),
        });
        toast.success("Manager added successfully");
        return { success: true, data: response.data }
    } catch (err) {
        toast.error(err?.response?.data?.message || "Adding manager failed")
        return { sucess: false, err }
    }

}

