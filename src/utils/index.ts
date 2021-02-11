import React from 'react';


export const useInterval = (callback: any, delay: any) => {
    const savedCallback = React.useRef<any>();
  
    React.useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);
  
    React.useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
};