import { MenuItem, Select } from "@mui/material";
import { ItemTypeToggle } from "components";
import { shipmentStatusToInt } from "constants/ShipmentConstants";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { storeInterface } from "types/storeTypes";

export const BoardSelector: React.FC = ({ }) => {

    const router = useRouter();

    const [activeTab, setActiveTab] = useState("all");

    const { trade }: storeInterface = useSelector((store: storeInterface) => store);

    const filter = (status_: string) => {

        const status = shipmentStatusToInt(status_);

        router.push(status_ === "all" ? `?` : `?status=${status}`)

        setActiveTab(status_);

    }

    const filterCarrier = (carrier_: string) => {

        router.push(carrier_ === "all" ? "?" : `?carrier=${carrier_}`)

    }

    return (

        <div className="landing-board">

            <ItemTypeToggle items={[

                {

                    label: "All",
                    onClick: () => filter('all'),
                    active: activeTab === "all"

                },

                {

                    label: "Pending",
                    onClick: () => filter('pending'),
                    active: activeTab === "pending"

                },

                {

                    label: "In-Transit",
                    onClick: () => filter('inTransit'),
                    active: activeTab === "inTransit"

                },

                {

                    label: "Delivered",
                    onClick: () => filter('delivered'),
                    active: activeTab === "delivered"

                },

            ]} />

            <div className="landing-board-carrier">

                <Select type='text' title='Carrier' defaultValue={"all"}>

                    <MenuItem

                        value={"all"}

                        onClick={() => filterCarrier("all")}

                    >

                        All Carriers

                    </MenuItem>

                    {trade.carriers?.items?.map(item =>

                        <MenuItem

                            key={`menu-item-${item.id}`}

                            value={item.id}

                            onClick={() => filterCarrier(item?.id?.toString())}

                        >

                            {item.name} - {item.vehicle}

                        </MenuItem>

                    )}

                </Select>

            </div>

        </div>

    )

}
