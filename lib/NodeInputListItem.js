import React, { useState } from 'react';

export const NodeInputListItem = ({
    onMouseUp,
    index,
    item
}) => {
    const [hover, setHover] = useState(false);

    const handleOnMouseUp = e => {
        e.stopPropagation();
        e.preventDefault();

        onMouseUp(index);
    }

    const onMouseOver = () => {
        setHover(true);
    }

    const onMouseOut = () => {
        setHover(false);
    }

    const noop = e => {
        e.stopPropagation();
        e.preventDefault();
    }

    return (
        <li>
            <a onClick={noop} onMouseUp={handleOnMouseUp} href={"#"}>
                <i className={hover ? 'fa fa-circle-o hover' : 'fa fa-circle-o'}
                   onMouseOver={onMouseOver}
                   onMouseOut={onMouseOut}
                ></i>
                { item.name }
            </a>
        </li>
    );
}