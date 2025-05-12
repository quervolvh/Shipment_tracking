import { ViewFormatter } from "components";
import React from "react";

export const MainLayoutSecuritiesBottomView: React.FC = () => {

    const securityItem = {

        title: "Soybean (SBBS)",

        value: "₦30,834.59"

    };

    return (

        <div className="main-layout-securities-bottom">

            <div className="main-layout-securities-bottom-title">

                <p>

                    Live Market

                </p>

            </div>

            <ViewFormatter {...securityItem} />

            <ViewFormatter {...securityItem} />

            <ViewFormatter {...securityItem} />

            <ViewFormatter {...securityItem} />

            <ViewFormatter {...securityItem} />

            <ViewFormatter {...securityItem} />

            <ViewFormatter {...securityItem} />

            <ViewFormatter {...securityItem} />

            <ViewFormatter {...securityItem} />

            <ViewFormatter {...securityItem} />

            <ViewFormatter {...securityItem} />

        </div>

    )

}