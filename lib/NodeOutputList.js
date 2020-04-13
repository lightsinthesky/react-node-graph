import React from 'react';

import { NodeOutputListItem } from './NodeOutputListItem';

export const NodeOutputList = ({
    onStartConnector,
    items
}) => {
    const onMouseDown = i => {
        onStartConnector(i);
    }

    let i = 0;

    return (
        <div className={"nodeOutputWrapper"}>
            <ul className={"nodeOutputList"}>
                {items.map(item => {
                    return <NodeOutputListItem 
                                onMouseDown={i => onMouseDown(i)}
                                key={i}
                                index={i++}
                                item={item} />
                })}
            </ul>
        </div>
    );
}