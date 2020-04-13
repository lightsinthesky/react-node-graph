import React, { useEffect, useState } from 'react';
import onClickOutside from 'react-onclickoutside';
import Draggable from 'react-draggable';

import { NodeInputList } from './nodeInput-hooks';
import { NodeOutputList } from './nodeOutputList-hooks';

const DragNode = ({ 
    onNodeDeselect,
    onNodeSelect,
    onNodeStart,
    onNodeStop,
    onNodeMove,
    onStartConnector,
    onCompleteConnector,
    index,
    inputs,
    outputs,
    nid,
    pos,
    title
}) => {
    const [selected, setSelected] = useState(false);

    // useEffect(() => {}, [selected]);

    const handleDragStart = (eve, ui) => {
        onNodeStart(nid, ui);
    }

    const handleDragStop = (eve, ui) => {
        onNodeStop(nid, {x: ui.x, y: ui.y});
    }

    const handleDrag = (eve, ui) => {
        // console.log(ui);
        onNodeMove(index, {x: ui.x, y: ui.y});
    }

    const handleOnStartConnector = idx => {
        onStartConnector(nid, idx);
    }

    const handleOnCompleteConnector = idx => {
        onCompleteConnector(nid, idx);
    }

    const handleClick = e => {
        setSelected(true);
        if (onNodeSelect) {
            onNodeSelect(nid);
        }
    }

    DragNode.handleClickOutside = () => {
        if (onNodeDeselect && selected) {
            onNodeDeselect(nid);
        }
        setSelected(false);
    }

    let nodeClass = `node ${selected ? ' selected' : ''}`

    return (
        <div onDoubleClick={e => handleClick(e)}>
            <Draggable
                position={{ x: pos.x, y: pos.y }}
                handle={".node-header"}
                onStart={(eve, ui) => handleDragStart(eve, ui)}
                onStop={(eve, ui) => handleDragStop(eve, ui)}
                onDrag={(eve, ui) => handleDrag(eve, ui)}>
                <section className={nodeClass} style={{zIndex: 10000}}>
                    <header className={"node-header"}>
                        <span className={"node-title"}>{title}</span>
                    </header>
                    <div className={"node-content"}>
                        <NodeInputList 
                            items={inputs}
                            onCompleteConnector={idx => handleOnCompleteConnector(idx)} />
                        <NodeOutputList
                            items={outputs}
                            onStartConnector={idx => handleOnStartConnector(idx)} />
                    </div>
                </section>
            </Draggable>
        </div>
    );
}

const handleClickConfig = {
    handleClickOutside: () => DragNode.handleClickOutside
}

export default onClickOutside(DragNode, handleClickConfig);