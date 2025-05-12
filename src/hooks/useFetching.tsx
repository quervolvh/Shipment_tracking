import { useEffect, useState } from 'react';
import { SetClientAvailability } from './useIsClient';
import { dependencyGenerator } from 'utils/dependencyGenerator';

export const useFetching = ({
    dispatcher,
    loadOnlyOnAvailableParam,
    doNotLoadOnAvailableParam,
    setter,
    safeParams,
    shouldDispatch,
    rawWatchList
}: Props) => {

    /* This hook makes it easier to fetch content from API's. 
       Depending on your approach, you can have the fetched data handled by your dispatcher function 
       i.e, by using actions and reducers to decide what is done with the data 
    */

    // You can also directly return the data fetched to your parent component by calling -> setter

    /* This hook directly involves using url parameters to trigger and fetch, hence, safeParams props
       should be an array of string parameters that work with your api call.
       i.e , safeParams: ["page", "perPage", "action"]
       This will ensure that whenever "page" param in your url changes , the dispatcher function is called.
    */

    /* Prop - loadOnlyOnAvailableParam ensures that even though other conditions for fetching are met, the dispatcher function
       is only going to be called when a specific param is provided with a particular value
       i.e, loadOnlyOnAvailableParam : { view : "vault" }, ensures that dispatcher is only called when the url string resembles
       https://{baseUrl}/item?view=vault&yadi=yada
    */

    /*
       To get loading state, it is advisable that this is drilled directly into your dispatcher function
       ( This approach has not entirely used as at 03/ July / 2022 )

       The approach used at this time involves saving the currently active parameters to the store and comparing 
       it to the latest parameters that have triggered a dispatch. If there is difference, loading state is assumed
       to be TRUE. 

    */

    const [clientMode, setClientMode] = useState(false);

    const paramObj = clientMode ? window?.history?.state?.as : undefined;

    const rawPageQuery = paramObj ? Object.fromEntries(new URLSearchParams(String(paramObj).split("?")[1])) : undefined;

    const fetchingMechanism = async (

        dispatcher: (paramObj: paramTypes) => void,

        loadOnlyOnAvailableParam?: { key?: string, value?: string },

        setter?: (e: any) => void,

    ) => {

        const exclusion = loadOnlyOnAvailableParam?.key && typeof loadOnlyOnAvailableParam?.value === "string";

        const excluding = (rawPageQuery || {})?.[loadOnlyOnAvailableParam?.key || "-"] || "";

        if (exclusion) {

            if (excluding !== loadOnlyOnAvailableParam?.value) {

                return;

            }

        }

        const doNotLoadOnAvailability = doNotLoadOnAvailableParam?.key && typeof doNotLoadOnAvailableParam?.value === "string";

        if (  doNotLoadOnAvailability && (rawPageQuery || {})[doNotLoadOnAvailableParam?.key || "-" || "" ] === doNotLoadOnAvailableParam?.value ) {

            return;

        }

        const usableParams: { [key: string]: string | number } = {};

        Object.entries(rawPageQuery || {}).forEach(([key, value]) => {

            if ((safeParams || []).includes(key)) {

                if (key === "page") {

                    usableParams[key] = Number(rawPageQuery?.page ? rawPageQuery.page : 1);

                    return;

                }

                usableParams[key] = value;

            }

        });

        const response = await dispatcher({ ...usableParams });

        setter && setter(response);

        // eslint-disable-next-line
    };


    useEffect(() => {

        if (rawPageQuery !== undefined && shouldDispatch !== false) {

            fetchingMechanism(dispatcher, loadOnlyOnAvailableParam, setter);

        }

        // eslint-disable-next-line
    }, [...dependencyGenerator(safeParams, rawPageQuery), rawPageQuery === undefined, shouldDispatch, ...(rawWatchList || [])]);

    SetClientAvailability((e) => setClientMode(e));

}

type paramTypes = { [key: string]: string | number | {} | undefined };

type dispatcherType = (paramObj: paramTypes) => void;

interface Props {
    dispatcher: dispatcherType,
    setter?: (e: any) => void,
    loadOnlyOnAvailableParam?: { key?: string, value?: string },
    doNotLoadOnAvailableParam?: { key?: string, value?: string },
    safeParams?: string[],
    rawWatchList?: string[],
    shouldDispatch?: boolean,
}
