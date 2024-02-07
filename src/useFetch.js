import { useEffect, useState } from "react";


export default function useFetch(urlEndPoint) {
    const [data, setData] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        fetch(urlEndPoint, { signal: controller.signal })
        .then(response => {
            if(!response.ok) { throw Error('could not fetch data from ' + response.url); }
            return response.json();
        })
        .then(data => {
            setData(data);
        })
        .catch(err => {
            if(err.name === 'AbortError') { return; }
            console.log(err.message);
        });

        return () => controller.abort();
    }, [urlEndPoint]);

    return { data }
}
