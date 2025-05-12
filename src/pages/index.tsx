import React, { useEffect, useState } from 'react';
import { MainLayout } from 'layout';
import { useDispatch } from 'react-redux';
import { ShipmentLog } from 'common/ShipmentLog';
import { shipmentProcess } from 'redux/actions/ShipmentActions';
import { BoardSelector } from 'common/Shipment/BoardSelector';

const Home: React.FC<Props> = ({ isMobile, deviceWidth }) => {

    const [state, setState] = useState({

        client: false,

    });

    const dispatch = useDispatch();

    useEffect(() => {

        Promise.all([

            dispatch(shipmentProcess("retrieve-carriers")),

            dispatch(shipmentProcess("retrieve-products"))

        ]);

        setState({ client: true });

        // eslint-disable-next-line
    }, []);

    return (

        <MainLayout
            title={"Tracking"}
            isMobile={isMobile}
            deviceWidth={deviceWidth}
        >

            <>

                {state.client && <BoardSelector />}

                {state.client && <ShipmentLog />}

            </>

        </MainLayout >

    )
}

export default Home;

interface Props {
    isMobile: boolean,
    deviceWidth: number
}
