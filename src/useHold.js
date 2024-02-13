import { useEffect, useRef } from 'react';


export default function useHold(callback, elementRef, cooldown) {
    const callbackRef = useRef(callback);
    const timerIdRef = useRef(null);


    useEffect(() => {
        callbackRef.current = callback;

        function onMouseDown() {
            timerIdRef.current = setInterval(() => {
                callbackRef.current();
            }, cooldown);
        };

        function clearTimer() {
            timerIdRef.current && clearInterval(timerIdRef.current);
        };

        if (elementRef.current) {
            elementRef.current.addEventListener("mousedown", onMouseDown);
            elementRef.current.addEventListener("mouseup", clearTimer);
            elementRef.current.addEventListener("mouseout", clearTimer);

            return () => {
                elementRef.current.removeEventListener("mousedown", onMouseDown);
                elementRef.current.removeEventListener("mouseup", clearTimer);
                elementRef.current.removeEventListener("mouseout", clearTimer);
            };
        }
    }, [callback]);
}
