import React, { useEffect, useState } from 'react';
import { Button, InputLabel, MenuItem, Modal, Select } from '@mui/material';
import { ontarioTowns } from 'constants/ShipmentConstants';
import { change, numberFormat } from 'utils';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useSelector } from 'react-redux';
import { storeInterface } from 'types/storeTypes';
import { useDispatch } from 'react-redux';
import { shipmentProcess } from 'redux/actions/ShipmentActions';
import { FormError } from 'components';
import { quickToast } from 'redux/store';

export const AddShipment: React.FC<{ trigger: number }> = ({ trigger }) => {

    const dispatch = useDispatch();

    const { trade }: storeInterface = useSelector((store: storeInterface) => store);

    const [state, setState] = useState<_state>({

        visibility: false,

        loading: false,

        key: Math.random().toString()

    });

    const create = async () => {

        try {

            setState((prevState) => ({ ...prevState, loading: true, error: undefined }));

            const data = {

                "Carrier": state.carrier!,

                "Product": state.product!,

                "Origin": state.origin!,

                "Destination": state.destination!,

                "ShipDate": state.shipDate!,

                "Eta": state.eta!

            };

            const res = await dispatch(shipmentProcess("create-shipment", data));

            if (res === true) {

                quickToast({ text: "Shipment created!" })

                dispatch(shipmentProcess("retrieve-shipments"));

                setState((prevState) => ({ ...prevState, loading: false, visibility: false }));

                return;

            }

            throw (res?.error);

        } catch (e: any) {

            setState((prevState) => ({ ...prevState, loading: false, error: e || "Unable to create shipment, please try again later" }));

        }

    }

    useEffect(() => {

        if (trigger !== undefined && trigger > 0) {

            setState({

                visibility: true,

                loading: false,

                key: Math.random().toString(),

            });

        }

    }, [trigger]);

    return (

        <>

            <Modal
                open={state.visibility}
                onClose={() => setState((prevState) => ({ ...prevState, visibility: false }))}

            >

                <div className='add-shipment' key={state.key}>

                    <div className='add-shipment-title'>

                        <h2> New Shipment </h2>

                        <p> Complete form to create new shipment </p>

                    </div>

                    <div className='add-shipment-form'>

                        <InputLabel>Origin</InputLabel>

                        <Select

                            type='text' title='Origin'

                        >

                            {ontarioTowns.map((item, index) =>

                                <MenuItem

                                    key={`ontario-town-item-${index}`}

                                    value={item}

                                    onClick={() => change(item, "origin", setState)}

                                > {item} </MenuItem>

                            )}

                        </Select>

                        <InputLabel>Destination</InputLabel>

                        <Select type='text' title='Destination'>

                            {ontarioTowns.map((item, index) =>

                                <MenuItem

                                    key={`ontario-town-item-${index}`}

                                    onClick={() => change(item, "destination", setState)}

                                    value={item}> {item} </MenuItem>

                            )}

                        </Select>

                        <InputLabel>Carrier</InputLabel>

                        <Select type='text' title='Carrier'>

                            {trade.carriers?.items?.map(item =>

                                <MenuItem

                                    key={`menu-item-${item.id}`}

                                    value={item.id}

                                    onClick={() => change(item.id, "carrier", setState)}

                                >

                                    {item.name} - {item.vehicle}

                                </MenuItem>

                            )}

                        </Select>

                        <InputLabel>Product</InputLabel>

                        <Select type='text' title='Product'>

                            {trade.products?.items?.map(item =>

                                <MenuItem

                                    key={`menu-item-${item.id}`}

                                    value={item.id}

                                    onClick={() => change(item.id, "product", setState)}

                                >

                                    {item.name} - {numberFormat(item.price)}

                                </MenuItem>

                            )}

                        </Select>

                        <InputLabel>Shipment Date</InputLabel>

                        <LocalizationProvider
                            dateAdapter={AdapterDayjs}
                            localeText={{
                                fieldMonthPlaceholder: (params) =>
                                    params.contentType === 'digit' ? 'MM' : params.format,
                            }}
                        >

                            <DatePicker

                                onChange={(e) => change(e?.toISOString(), "shipDate", setState)}

                            />

                        </LocalizationProvider>

                        <InputLabel>ETA</InputLabel>

                        <Select type='text' title='Product'>

                            {['One Week', 'Two Weeks', 'Three Weeks']?.map((item, index) =>

                                <MenuItem

                                    key={`menu-item-eta-${index}`}

                                    value={item}

                                    onClick={() => change(index, "eta", setState)}

                                >

                                    {item}

                                </MenuItem>

                            )}

                        </Select>

                        <FormError text={state.error} condition={state.error !== undefined} />

                        <div className='add-shipment-actions'>

                            <Button variant="contained" onClick={() => !state.loading && create()}>

                                {state.loading ? "Please wait..." : "Create Shipment"}

                            </Button>

                            <Button 
                            
                                variant="outlined" 
                                
                                onClick={()=> setState((prevState) => ({ ...prevState, loading: false, visibility: false }))}
                                
                            >Go Back</Button>

                        </div>

                    </div>

                </div>

            </Modal>

        </>
    )

}

type _state = {

    carrier?: string,

    product?: string,

    origin?: string,

    destination?: string,

    shipDate?: string,

    eta?: string,

    visibility: boolean,

    loading: boolean,

    error?: string,

    key: string

}
