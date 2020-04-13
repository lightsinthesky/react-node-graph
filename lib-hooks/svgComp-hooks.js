import React, { useRef } from 'react';

export const SVGComponent = (props) => {
    const svg = useRef();

    return <svg style={{position: 'absolute', zIndex: 9000}}
                {...props}
                ref={svg}>
                {props.children}
            </svg>;
}