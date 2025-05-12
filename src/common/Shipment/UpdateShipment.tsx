import React, { useEffect, useState } from 'react';
import { Button, Modal } from '@mui/material';
import { useSelector } from 'react-redux';
import { shipmentType, storeInterface } from 'types/storeTypes';
import { useDispatch } from 'react-redux';
import { shipmentProcess } from 'redux/actions/ShipmentActions';
import { FormError, ItemTypeToggle, ViewFormatter } from 'components';
import { quickToast } from 'redux/store';
import { DD_MM_YY } from 'utils/date';
import { shipmentStatusMap, shipmentStatusToInt } from 'constants/ShipmentConstants';

export const UpdateShipment: React.FC<{ trigger: number, shipment?: shipmentType }> = ({ trigger, shipment }) => {

    const dispatch = useDispatch();

    const { trade }: storeInterface = useSelector((store: storeInterface) => store);

    const [state, setState] = useState<_state>({

        visibility: false,

        loading: false,

        key: Math.random().toString(),

        status: "",

    });

    const update = async (status: string) => {

        try {

            setState((prevState) => ({ ...prevState, loading: true, error: undefined }));

            const data = {

                "shipmentId": shipment?.id!,

            };

            const res = await dispatch(shipmentProcess("update-shipment", data, { "status": status, }));

            if (res === true) {

                quickToast({ text: "Shipment status updated!" })

                dispatch(shipmentProcess("retrieve-shipments"), {}, { page: trade.shipments.page });

                setState((prevState) => ({ ...prevState, loading: false , status }));

                return;

            }

            throw (res?.error);

        } catch (e: any) {

            setState((prevState) => ({ ...prevState, loading: false, error: e || "Unable to update shipment, please try again later" }));

        }

    }

    useEffect(() => {

        if (trigger !== undefined && trigger > 0 && shipment) {

            setState({

                visibility: true,

                loading: false,

                key: Math.random().toString(),

                status: shipmentStatusMap(shipment?.status)

            });

        }

        // eslint-disable-next-line
    }, [trigger]);

    return (

        <>

            <Modal
                open={state.visibility}
                onClose={() => setState((prevState) => ({ ...prevState, visibility: false }))}

            >

                <div className='add-shipment add-shipment-fill' key={state.key}>

                    <div className='add-shipment-title'>

                        <h2> Shipment </h2>

                        <p> View / Update Shipment Detail in Real Time </p>

                    </div>

                    <div className='add-shipment-form'>

                        <ViewFormatter title='Origin' value={shipment?.origin} />

                        <ViewFormatter title='Destination' value={shipment?.destination} />

                        <ViewFormatter title='Carrier' value={shipment?.carrier?.name} />

                        <ViewFormatter title='Product' value={shipment?.product?.name} />

                        <ViewFormatter title='ETA' value={shipment?.eta} />

                        <ViewFormatter title='Shipment Date' value={DD_MM_YY(shipment?.shipDate ?? "")} />

                        <ViewFormatter title='Reference' value={shipment?.reference} />

                        <ViewFormatter title='Status' />

                        <ItemTypeToggle items={[

                            {

                                label: "Pending",
                                onClick: () => update("pending"),
                                active: state.status === "pending"

                            },

                            {

                                label: "Packed",
                                onClick: () => update("packed"),
                                active: state.status === "packed"

                            },

                            {

                                label: "In-Transit",
                                onClick: () => update("inTransit"),
                                active: state.status === "inTransit"

                            },

                            {

                                label: "Delivered",
                                onClick: () => update("delivered"),
                                active: state.status === "delivered"

                            },

                            {

                                label: "Failed",
                                onClick: () => update("failed"),
                                active: state.status === "failed"

                            }

                        ]} />

                        <FormError text={state.error} condition={state.error !== undefined} />

                        <div className='add-shipment-actions'>

                            <Button

                                variant="outlined"

                                onClick={() => setState((prevState) => ({ ...prevState, loading: false, visibility: false }))}

                            >Go Back</Button>

                        </div>

                    </div>

                </div>

            </Modal>

        </>
    )

}

type _state = {

    visibility: boolean,

    loading: boolean,

    error?: string,

    key: string,

    status?: string

}
