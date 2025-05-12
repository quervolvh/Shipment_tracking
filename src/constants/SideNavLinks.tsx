import { CommunityIcon, MarketIcon, OverviewIcon, PortfolioIcon } from "components";

export const SIDENAVLINKS: {
    title: string,
    link: string,
    icon: string
}[] = [
        {
            title: "Overview",
            link: "?",
            icon: OverviewIcon,
        },

        {
            title: "Shipments",
            link: "/",
            icon: MarketIcon,
        },

        {
            title: "Carriers",
            link: "$",
            icon: CommunityIcon,
        },

        {
            title: "Products",
            link: "$",
            icon: PortfolioIcon,
        },

    ];
