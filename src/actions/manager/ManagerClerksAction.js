import axios from 'axios';
import authHeader from '../../services/auth-header';
import { toast } from 'react-toastify'

// Create Redux action types
export const GET_CLERKS = "GET_CLERKS";
export const GET_CLERKS_SUCCESS = "GET_CLERKS_SUCCESS";
export const GET_CLERKS_FAILURE = "GET_CLERKS_FAILURE";
export const SEND_CLERKS = "SEND_CLERKS";
export const SEND_CLERKS_SUCCESS = "SEND_CLERKS_SUCCESS";
export const SEND_CLERKS_FAILURE = "SEND_CLERKS_FAILURE";

const ENDPOINT = import.meta.env.VITE_REACT_APP_BASE_API_URL;


// Create Redux action creators that return an action
export const getClerks = () => ({
    type: GET_CLERKS,
});

export const getClerksSuccess = (Clerks) => ({
    type: GET_CLERKS_SUCCESS,
    payload: Clerks,
});

export const getClerksFailure = () => ({
    type: GET_CLERKS_FAILURE,
});

export const sendClerks = () => ({
    type: SEND_CLERKS,
});

export const sendClerksSuccess = () => ({
    type: SEND_CLERKS_SUCCESS,
});

export const sendClerksFailure = () => ({
    type: SEND_CLERKS_FAILURE,
});


export function fetchClerks(page = 0, searchValues = { name: null },status="Active") {
    let limit = 5;
    return async (dispatch, getState) => {
        dispatch(getClerks());
        try {
            const url = `/clerks/my-clerks?limit=${limit}&page=${page}&status=${status.toUpperCase()}`;
            const FilterUrl = `/clerks/my-clerks?&name=${searchValues.name}&status=${status.toUpperCase()}&limit=${limit}&page=${page}`;


            let useSearch =
                searchValues.name

            let clerskFromBackend = await axios.get(`${ENDPOINT}${useSearch ? FilterUrl : url}`, {
                headers: authHeader(),
            });
            clerskFromBackend = clerskFromBackend.data.data;
            if (useSearch) {
                clerskFromBackend = { ...clerskFromBackend, searchValues };
            }
            dispatch(getClerksSuccess(clerskFromBackend));
        } catch (error) {
            dispatch(getClerksFailure());
        }
    };
}


async function reloadClerks(dispatch, getState) {
    let currentPage = getState().managerClerks.number;
    await dispatch(fetchClerks(currentPage));
}
export function dispatchReloadClerks() {
    return async (dispatch, getState) => {
        reloadClerks(dispatch, getState);
    };
}

export async function postClerks(dataToPost) {
    try {
        const url = `/clerks/register`;
        let response = await axios.post(`${ENDPOINT}${url}`, dataToPost, {
            headers: authHeader(),
        });
        toast.success("Clerk added successfully");
        return { success: true, data: response.data }
    } catch (err) {
        toast.error(err?.response?.data?.message || "Adding Clerk failed")
        return { sucess: false, err }
    }

}

