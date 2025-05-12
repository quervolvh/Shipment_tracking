import { UpdateShipment } from "common/Shipment/UpdateShipment";
import { Table } from "components";
import { Pagination } from "components/Pagination";
import { shipmentStatusMap } from "constants/ShipmentConstants";
import { useFetching } from "hooks/useFetching";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { shipmentProcess } from "redux/actions/ShipmentActions";
import { shipmentType, storeInterface } from "types";
import { numberFormat } from "utils";
import { DD_MM_YY, HH_MM } from "utils/date";

export const ShipmentLog: React.FC = ({ }) => {

    const dispatch = useDispatch();

    const router = useRouter();

    const { trade }: storeInterface = useSelector((store: storeInterface) => store);

    const [state, setState] = useState<_state>({ selectedShipment: undefined, trigger: 0 });

    const tradeLogs = (trade?.shipments?.items || {})?.[trade?.shipments.page]?.map((item) =>

        [

            item.reference,

            shipmentStatusMap(item.status),

            item.origin ?? "",

            item.destination ?? "",

            item.carrier.name,

            numberFormat(Number(item.price)),

            item.product.name,

            `${DD_MM_YY(new Date(item.shipDate).toISOString())} ${HH_MM(new Date(item.shipDate).toISOString())}`,

            {
    
                render: "link",

                preClick: () => setState((prevState) => ({ trigger: prevState.trigger + 1, selectedShipment: item }))

            }

        ]

    );

    useFetching({

        dispatcher: (e: any) => dispatch(shipmentProcess("retrieve-shipments", {}, e)),

        loadOnlyOnAvailableParam: {},

        safeParams: ["page", "status", "carrier"]

    });

    return (

        <>

            <UpdateShipment

                trigger={state.trigger}

                shipment={state.selectedShipment}

            />

            <div className="landing-trade-log-heading">

                <p> SHIPMENT LOG </p>

            </div>

            <div className="landing-trade-log">

                <Table

                    heading={["Reference", "Status", "Origin", "Destination", "Carrier", "Price", "Product", "Shipment Date"]}

                    data={tradeLogs}

                    loader={trade?.shipments?.loader}

                />

                <Pagination

                    page={trade.shipments.page}

                    pages={trade.shipments.totalPages}

                    onClick={(page) => router.push(`?page=${page}`)}

                    isMobile={false}

                />

            </div>

        </>

    )

}

type _state = {

    selectedShipment?: shipmentType,

    trigger: number

}
