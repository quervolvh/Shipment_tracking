import * as tradeActionTypes from '../types/tradeTypes';
import { typeOfDispatch } from 'redux/store';
import axios from 'service/axios';

const dispatchActions = (type: "retrieve-products" | "retrieve-shipments" | "retrieve-carriers" | "create-shipment" | "update-shipment") => {

    if (type === "retrieve-products") {

        return ({
            start: tradeActionTypes.RETRIEVE_PRODUCTS_START,
            success: tradeActionTypes.RETRIEVE_PRODUCTS_SUCCESS,
            failure: tradeActionTypes.RETRIEVE_PRODUCTS_FAILURE
        });

    }

    if (type === "retrieve-shipments") {

        return ({
            start: tradeActionTypes.RETRIEVE_SHIPMENTS_START,
            success: tradeActionTypes.RETRIEVE_SHIPMENTS_SUCCESS,
            failure: tradeActionTypes.RETRIEVE_SHIPMENTS_FAILURE
        });

    }

    if (type === "create-shipment") {

        return ({
            start: tradeActionTypes.CREATE_SHIPMENT_START,
            success: tradeActionTypes.CREATE_SHIPMENT_SUCCESS,
            failure: tradeActionTypes.CREATE_SHIPMENT_FAILURE
        });

    }

    if (type === "update-shipment") {

        return ({
            start: tradeActionTypes.UPDATE_SHIPMENT_START,
            success: tradeActionTypes.UPDATE_SHIPMENT_SUCCESS,
            failure: tradeActionTypes.UPDATE_SHIPMENT_FAILURE
        });

    }

    return ({
        start: tradeActionTypes.RETRIEVE_CARRIERS_START,
        success: tradeActionTypes.RETRIEVE_CARRIERS_SUCCESS,
        failure: tradeActionTypes.RETRIEVE_CARRIERS_FAILURE
    });

}

export const shipmentProcess = (
    ref: "retrieve-products" | "retrieve-shipments" | "retrieve-carriers" | "create-shipment" | "update-shipment" = "retrieve-carriers",
    reqData: Record<string, string | number> = {},
    queryParam?: Record<string, string | number>,
) =>
    async (dispatch: typeOfDispatch) => {

        try {

            const params = queryParam ? new URLSearchParams(Object(queryParam)).toString() : "";

            dispatch({
                type: dispatchActions(ref).start,
                payload: { ...reqData }
            });

            const { data } = await axios.post('/api/trade', { authType: ref, params,  ...(reqData ?? {}) });

            dispatch({
                type: dispatchActions(ref).success,
                payload: data
            });

            return true;

        } catch (error: any) {

            const data = error?.response?.data;

            dispatch({
                type: dispatchActions(ref).failure,
                payload: { data }
            });

            return data || false;
        }

    };
