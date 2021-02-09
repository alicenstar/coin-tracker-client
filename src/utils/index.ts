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

export const useResizeObserver = (myRef: React.RefObject<any>) => {
    const [dimensions, setDimensions] = React.useState({
        width: 0,
        height: 0
    });
    const observer = React.useRef(
        new ResizeObserver(entries => {
            const { height, width } = entries[0].contentRect;
            setDimensions({
                width: width,
                height: height,
            });
        })
    );
  
    React.useEffect(() => {
        const observerRef = observer.current;
        const elementRef = myRef.current;
        if (myRef.current) {
            observer.current.observe(myRef.current);
        }
        return () => {
            observerRef.unobserve(elementRef);
        };
    }, [myRef, observer]);

    return dimensions;
};