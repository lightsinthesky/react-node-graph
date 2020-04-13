import React from 'react';

export const NodeOutputListItem = ({
    onMouseDown,
    index,
    item
}) => {
    const handleOnMouseDown = e => {
        e.stopPropagation();
        e.preventDefault();

        onMouseDown(index);
    }

    const noop = e => {
        e.stopPropagation();
        e.preventDefault();
    }

    return (
        <li onMouseDown={handleOnMouseDown}>
            <a href={"#"} onClick={noop}>
                { item.name }
                <i className={"fa fa-circle-o"}></i>
            </a>
        </li>
    )
}