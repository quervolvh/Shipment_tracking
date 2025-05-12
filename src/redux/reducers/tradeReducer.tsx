import * as tradeActions from 'redux/types/tradeTypes';

const initialState = {

  logs: {

    messages: [],

    loader: true

  },

  carriers: {

    item: [],

    loader: true,

  },

  products: {

    items: [],

    loader: true

  },

  shipments: {

    items: [],

    page: 1,

    pageSize: 14,

    totalItems: 1,

    totalPages: 1,

    loader: true

  }

};

const tradeReducer = (state = initialState, action: { [key: string]: any }) => {

  switch (action.type) {

    case tradeActions.RETRIEVE_SHIPMENTS_SUCCESS:

      return {
        ...state,

        shipments: {

          loader: false,

          page: action.payload?.page,

          pageSize: action.payload?.pageSize,

          totalItems: action.payload?.totalItems,

          totalPages: action.payload?.totalPages,

          items: { [action.payload?.page]: action?.payload?.items ?? [] },

        }

      };

    case tradeActions.RETRIEVE_PRODUCTS_SUCCESS:

      return {
        ...state,

        products: {

          loader: false,

          items: action?.payload ?? []

        }

      };

    case tradeActions.RETRIEVE_CARRIERS_SUCCESS:

      return {
        ...state,

        carriers: {

          loader: false,

          items: action?.payload ?? []

        }

      };

    default:
      return state;
  }
};

export default tradeReducer;
