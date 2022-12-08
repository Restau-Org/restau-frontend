import axios from 'axios';
import authHeader from '../../services/auth-header';
import { toast } from 'react-toastify'

// Create Redux action types
export const GET_CHEF = "GET_CHEF";
export const GET_CHEF_SUCCESS = "GET_CHEF_SUCCESS";
export const GET_CHEF_FAILURE = "GET_CHEF_FAILURE";
export const SEND_CHEF = "SEND_CHEF";
export const SEND_CHEF_SUCCESS = "SEND_CHEF_SUCCESS";
export const SEND_CHEF_FAILURE = "SEND_CHEF_FAILURE";

const ENDPOINT = import.meta.env.VITE_REACT_APP_BASE_API_URL;


// Create Redux action creators that return an action
export const getChefs = () => ({
    type: GET_CHEF,
});

export const getChefsSuccess = (Chefs) => ({
    type: GET_CHEF_SUCCESS,
    payload: Chefs,
});

export const getChefsFailure = () => ({
    type: GET_CHEF_FAILURE,
});

export const sendChefs = () => ({
    type: SEND_CHEF,
});

export const sendChefsSuccess = () => ({
    type: SEND_CHEF_SUCCESS,
});

export const sendChefsFailure = () => ({
    type: SEND_CHEF_FAILURE,
});


export function fetchChefs(page = 0, searchValues = { name: null },status="Active") {
    let limit = 5;
    return async (dispatch, getState) => {
        dispatch(getChefs());
        try {
            const url = `/chefs/my-chefs?limit=${limit}&page=${page}&status=${status.toUpperCase()}`;
            const FilterUrl = `/chefs/my-chefs?&name=${searchValues.name}&status=${status.toUpperCase()}&limit=${limit}&page=${page}`;


            let useSearch =
                searchValues.name

            let chefsFromBackend = await axios.get(`${ENDPOINT}${useSearch ? FilterUrl : url}`, {
                headers: authHeader(),
            });
            chefsFromBackend = chefsFromBackend.data.data;
            if (useSearch) {
                chefsFromBackend = { ...chefsFromBackend, searchValues };
            }
            dispatch(getChefsSuccess(chefsFromBackend));
        } catch (error) {
            dispatch(getChefsFailure());
        }
    };
}


async function reloadChefs(dispatch, getState) {
    let currentPage = getState().managerChefs.number;
    await dispatch(fetchChefs(currentPage));
}
export function dispatchReloadChefs() {
    return async (dispatch, getState) => {
        reloadChefs(dispatch, getState);
    };
}

export async function postChefs(dataToPost) {
    try {
        const url = `/chefs/register`;
        let response = await axios.post(`${ENDPOINT}${url}`, dataToPost, {
            headers: authHeader(),
        });
        toast.success("Chef added successfully");
        return { success: true, data: response.data }
    } catch (err) {
        toast.error(err?.response?.data?.message || "Adding Chef failed")
        return { sucess: false, err }
    }

}

