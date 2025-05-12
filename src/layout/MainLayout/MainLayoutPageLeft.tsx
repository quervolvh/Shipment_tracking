import React, { useState } from 'react';
import { OrderViewIcon, PriceHistoryIcon, ProductViewIcon, ViewFormatter, FormField } from 'components';
import { AddShipment } from 'common/Shipment/AddShipment';

export const MainLayoutPageLeft: React.FC = () => {

    const [trigger, setTrigger] = useState({

        shipment: 0,
        
        carrier: 0,

        product: 0,

    });

    const items = [

        {

            title: "New Shipment",
            icon: PriceHistoryIcon,
            onClick: ()=> setTrigger((prevState)=> ({ ...prevState , shipment: prevState.shipment + 1}))

        },

        {

            title: "New Carrier",
            icon: OrderViewIcon,
            onClick: ()=> setTrigger((prevState)=> ({ ...prevState , carrier: prevState.carrier + 1}))

        },

        {

            title: "New Product",
            icon: ProductViewIcon,
            onClick: ()=> setTrigger((prevState)=> ({ ...prevState , product: prevState.product + 1}))

        },

    ];

    return (

        <>

            <AddShipment trigger={trigger.shipment} />

            <div className='landing-side-menu'>

                <FormField placeHolder={"Actions"} value="Actions" />

                {items.map((item) =>

                    <ViewFormatter

                        key={`side-menu-item-${item.title}`}

                        title={item.title}

                        svgLeftIcon={item.icon}

                        onClick={()=> item.onClick()}


                    />

                )}

            </div>

        </>
    )

}
