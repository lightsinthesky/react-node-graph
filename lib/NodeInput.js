import React from 'react';

import { NodeInputListItem } from './NodeInputListItem';

export const NodeInputList = ({
    items,
    onCompleteConnector
}) => {
    const onMouseUp = i => {
        onCompleteConnector(i);
    }

    let i = 0;

    return (
        <div className={"nodeInputWrapper"}>
            <ul className={"nodeInputList"}>
                {items.map(item => {
                    return <NodeInputListItem
                                onMouseUp={i => onMouseUp(i)}
                                key={i}
                                index={i++}
                                item={item}/>
                })}
            </ul>
        </div>
    )
}