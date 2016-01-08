react-draggable state problem

`<Draggable>` is a stateful component. This means that it is storing its current drag offsets in its internal state.
This can cause problems with certain integrations. For example, if you change the position of the element manually,
`<Draggable>` can get into trouble as it assumes a translation in the DOM. If you see an element jump around the page
when you click it, this is affecting you.

More technically, react-draggable is storing a clientX and clientY, and I want to change that at will.

It should instead call back on drag with what it believes to be its offset from where it began, rather than
setting it itself. That offset is of course reset every time it is moved.

PROGRESS
--------

Almost there! two tests failing. TODO write some more tests.


Okay, rewrite is done, it's split, but here's the real problem, as predicted (and why we split <DraggableCore>)

The state can't live in the <Draggable>, it needs to live in its parent. The reason is, we should always be declaring
the exact position of all grid items, not all of them except one that may be being dragged right now.

We could set start.x = null & start.y = null during dragging if we want Draggable to know it should recalibrate when
reset. But it is pretty hacky in the usual case, if I want to move all the draggables, to have to take two steps
(set to null, set to real value) to move a draggable programatically. And we can't just keep the original value in state
and check when props change, because there'd be no way to snap a draggable back.

This is where interactions get tough because of React's declarative nature.

Here's an option: set `disabled={true}` on each el until it is clicked. When disabled, <Draggable> simply obeys
its start param only. Can we possibly catch the click event before `<Draggable>` does or re-emit it?
