import axios from 'axios'
import { authorizedHeader } from 'service/helper';

const link = (item: string, shipmentId?: string, params?: string): { type: "post" | "get" | "patch" | "put", url: string } => {

    switch (item) {

        case "retrieve-products":
            return { type: "get", url: "products" };

        case "retrieve-carriers":
            return { type: "get", url: "carriers" };

        case "retrieve-shipments":
            return { type: "get", url: `shipments?${params ?? ""}` };

        case "create-shipment":
            return { type: "post", url: "shipments" };

        case "update-shipment":
            return { type: "put", url: `shipments/${shipmentId}?${params ?? ""}` }

        default:
            return { type: "get", url: "shipments" };
    }
}

async function handler(req: { [key: string]: any }, res: { [key: string]: any }) {

    try {

        const { authType, params, shipmentId, ...rest } = req.body;

        const { type, url } = link(authType, shipmentId, params);

        const completeUrl = `${process.env.BASE_URL}/${url}`;

        const { data } = await axios.call(
            type,
            completeUrl,
            { ...authorizedHeader(req?.headers?.authorization), data: rest, method: type, timeout: 120000 }
        ) as any;

        res.status(200).json(data);

    } catch (error: any) {

        const { data } = error.response || {};
        const err = data || {};

        return res.status(500).json(err);
    }
};

export default handler;
