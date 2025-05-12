import { useEffect } from "react"
import { w3cwebsocket as socket } from 'websocket';

export const useSocketStream = ( url : string , action : (e : unknown ) => void ) => {

    let client = new socket(url);

    useEffect(()=> {

        client.onmessage = (event: { [ key: string ] : any }) => {

            const data = JSON.parse(event.data);

            action(data);

        };

        return () => {

            client.close();

        }

    // eslint-disable-next-line
    },[]);

}
