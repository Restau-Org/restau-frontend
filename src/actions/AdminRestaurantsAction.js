import axios from 'axios';
import authHeader from '../services/auth-header';
import { toast } from 'react-toastify'
import confirmAction from '../helpers/confirmAction';


// Create Redux action types
export const GET_RESTAURANTS = "GET_RESTAURANTS";
export const GET_RESTAURANTS_SUCCESS = "GET_RESTAURANTS_SUCCESS";
export const GET_RESTAURANTS_FAILURE = "GET_RESTAURANTS_FAILURE";
export const SEND_RESTAURANTS = "SEND_RESTAURANTS";
export const SEND_RESTAURANTS_SUCCESS = "SEND_RESTAURANTS_SUCCESS";
export const SEND_RESTAURANTS_FAILURE = "SEND_RESTAURANTS_FAILURE";
export const DISACTIVATE_RESTAURANT = "DISACTIVATE_RESTAURANT";
export const DISACTIVATE_RESTAURANT_SUCCESS = "DISACTIVATE_RESTAURANT_SUCCESS";
export const DISACTIVATE_RESTAURANT_FAILURE = "DISACTIVATE_RESTAURANT_FAILURE";
export const ACTIVATE_RESTAURANT = "ACTIVATE_RESTAURANT";
export const ACTIVATE_RESTAURANT_SUCCESS = "ACTIVATE_RESTAURANT_SUCCESS";
export const ACTIVATE_RESTAURANT_FAILURE = "ACTIVATE_RESTAURANT_FAILURE";

const ENDPOINT = import.meta.env.VITE_REACT_APP_BASE_API_URL;


// Create Redux action creators that return an action
export const getRestaurants = () => ({
    type: GET_RESTAURANTS,
});

export const getRestaurantsSuccess = (Restaurants) => ({
    type: GET_RESTAURANTS_SUCCESS,
    payload: Restaurants,
});

export const getRestaurantsFailure = () => ({
    type: GET_RESTAURANTS_FAILURE,
});

export const sendRestaurants = () => ({
    type: SEND_RESTAURANTS,
});

export const sendRestaurantsSuccess = () => ({
    type: SEND_RESTAURANTS_SUCCESS,
});

export const sendRestaurantsFailure = () => ({
    type: SEND_RESTAURANTS_FAILURE,
});

export const deactivateRestaurant = () => ({
    type: DISACTIVATE_RESTAURANT,
})

export const deactivateRestaurantSuccess = (id) => ({
    type: DISACTIVATE_RESTAURANT_SUCCESS,
    payload: { id },
})
export const deactivateRestaurantFailure = () => ({
    type: DISACTIVATE_RESTAURANT_FAILURE,
})

export const activateRestaurant = () => ({
    type: ACTIVATE_RESTAURANT,
})

export const activateRestaurantSuccess = (id) => ({
    type: ACTIVATE_RESTAURANT_SUCCESS,
    payload: { id },

})
export const activateRestaurantFailure = () => ({
    type: ACTIVATE_RESTAURANT_FAILURE,

})

export function fetchRestaurants(page = 0, searchValues = { name: null },status="Active") {
    let limit = 5;
    return async (dispatch, getState) => {
        dispatch(getRestaurants());
        try {
            const url = `/restaurants/search?limit=${limit}&page=${page}&status=${status.toUpperCase()}`;
            const FilterUrl = `/restaurants/search?&name=${searchValues.name}&status=${status.toUpperCase()}&limit=${limit}&page=${page}`;


            let useSearch =
                searchValues.name

            let restaurantsFromBackend = await axios.get(`${ENDPOINT}${useSearch ? FilterUrl : url}`, {
                headers: authHeader(),
            });
            restaurantsFromBackend = restaurantsFromBackend.data.data;
            if (useSearch) {
                restaurantsFromBackend = { ...restaurantsFromBackend, searchValues };
            }
            dispatch(getRestaurantsSuccess(restaurantsFromBackend));
        } catch (error) {
            dispatch(getRestaurantsFailure());
        }
    };
}

async function reloadRestaurants(dispatch, getState) {
    let currentPage = getState().adminRestaurants.number;
    await dispatch(fetchRestaurants(currentPage));
}
export function dispatchReloadRestaurants() {
    return async (dispatch, getState) => {
        reloadRestaurants(dispatch, getState);
    };
}


export async function changeRestaurant(dataToEdit) {
    try {
        const { id, ...restData } = dataToEdit;
        const url = `/restaurants/${id}/update`;
        let response = await axios.put(`${ENDPOINT}${url}`, restData, {
            headers: authHeader(),
        });
        toast.success("Editing restaurant successfully");
        return { success: true, data: response.data }
    } catch (error) {
        toast.error(error?.response?.data?.message || "Editing restaurant failed");
        return { success: false, error }
    }
}

export async function postRestaurant(dataToPost) {
    try {
        const url = `/restaurants/register`;
        let response = await axios.post(`${ENDPOINT}${url}`, dataToPost, {
            headers: authHeader(),
        });
        toast.success("Restaurant added successfully");
        return { success: true, data: response.data }
    } catch (err) {
        toast.error(err?.response?.data?.message || "Adding restaurant failed")
        return { sucess: false, err }
    }

}

export function editRestaurant(dataToEdit) {
    return async (dispatch, getState) => {
        dispatch(sendRestaurants());

        try {
            const url = `/restaurants/${dataToEdit.id}/update`;
            await axios.put(`${ENDPOINT}${url}`, dataToEdit, {
                headers: authHeader(),
            });
            toast.success("Editing restaurant is successfull");
            dispatch(sendRestaurantsSuccess());
            reloadRestaurants(dispatch, getState)
        } catch (error) {
            toast.error(error?.response?.data?.message || "Editing restaurant failed.")
            dispatch(sendRestaurantsFailure());
        }
    }
}



export function disableRestaurant(id) {
    return async (dispatch, getState) => {
        if (await confirmAction("Deactivate", "Are you sure you want to deactivate this restaurant ")) {

            try {
                const url = `/restaurants/${id}/de-activate`;
                await axios.put(`${ENDPOINT}${url}`, {},{
                    headers: authHeader(),
                });
                toast.success("Restaurant deactivated successfully");
                dispatch(deactivateRestaurantSuccess(id))
                reloadRestaurants(dispatch, getState)
                return { success: true };
            } catch (error) {
                toast.error(
                    error?.response?.data?.message || "deactivating restaurant failed."
                );
                return { success: false, error };
            }
        }
    }

}

export function enableRestaurant(id) {
    return async (dispatch, getState) => {
        if (await confirmAction("Activate ", "Are you sure you want to activate this restaurant")) {
            try {
                const url = `/restaurants/${id}/activate`;
                await axios.put(`${ENDPOINT}${url}`, {}, { headers: authHeader() });
                toast.success("Restaurant activated successfully");
                dispatch(activateRestaurantSuccess(id));
                reloadRestaurants(dispatch, getState)
                return { success: true }
            } catch (error) {
                toast.error(error?.response?.data?.message || "Activating restaurant failed")
                return { sucess: false, error }
            }
        }
    }
}