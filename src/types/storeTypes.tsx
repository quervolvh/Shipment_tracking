export type authType = {
    token?: string,
    expiresAt?: string
}

export type routeType = {
    currentPath: {
        fullPath?: string,
        queries?: { [key: string]: string },
        specificPath?: string
    },
    previousPath: {
        fullPath?: string,
        queries?: { [key: string]: string },
        specificPath?: string
    },
    tempPath: {
        fullPath?: string,
        queries?: { [key: string]: string },
        specificPath?: string
    },
    navigating: boolean,
    visitationTrack: string[]
}

export type toastType = {
    timer: number,
    nature?: string,
    manualDismiss?: boolean,
    toDismiss?: string,
    toast?: { id: string, text: string },
    toasts: { id: string, text: string, new: boolean }[]
}

export type workerType = {
    activity: string[],
    refreshing: boolean
}

export type utilType = {
    cities: {
        loader: boolean,
        error: boolean,
        data: {
            [key: string]: { name: string, id: string }[]
        }
    },
    states: {
        loader: boolean,
        error: boolean,
        data: { name: string, id: string }[]
    }
}

export type shipmentType = {

    carrier: {

        name: string,

    },

    carrierId: string,

    productId: string,

    status: number,

    product: {

        name: string
    }

    reference: string,

    price: string,

    updatedAt: string,

    createdAt: string,

    origin: string,

    destination: string,

    shipDate: string,

    eta: string,

    id: string

};

export type tradeType = {

    shipments: {

        items: { [key: number] : shipmentType[]},

        pageSize: number,

        page: number,

        totalItems: number,

        totalPages: number,

        loader: boolean

    },

    products: {


        items: {
            
            name: string,
            
            price: number,
            
            id: number,

            updatedAt: string,

            createdAt: string

        }[],

        loader: boolean

    },

    carriers: {


        items: {
            
            name: string,
            
            price: number,
            
            id: number,
            
            vehicle: number,

            updatedAt: string,

            createdAt: string
        
        }[],

        loader: boolean

    }

}

export interface storeInterface {
    auth: authType,
    route: routeType
    toast: toastType,
    util: utilType,
    worker: workerType,
    trade: tradeType
}
