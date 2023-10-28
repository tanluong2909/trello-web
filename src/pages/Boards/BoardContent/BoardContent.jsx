import Box from "@mui/material/Box";
import ListColumns from "./ListColumns/ListColumns";
import { useEffect, useState } from "react";
import { mapOrder } from "../../../utils/sorts";
import {
  DndContext,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import Column from "./ListColumns/Column/Column";
import Card from "./ListColumns/Column/ListCards/Card/Card";
const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD',
}

const BoardContent = ({ board }) => {
  const [orderedColumns, setOrderedColumns] = useState([]);
  const [activeDragItemId, setActiveDragItemId] = useState(null);
  const [activeDragItemType, setActiveDragItemType] = useState(null);
  const [activeDragItemData, setActiveDragItemData] = useState(null);
  // const pointerSensor = useSensor(PointerSensor, {
  //   activationConstraint: { distance: 10 },
  // });
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 10 },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 250, tolerance: 50 },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, "_id"));
  }, [board]);

  const handleDragStart = (event) => {
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD: ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)
  };
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;
    if (active.id !== over.id) {
      const oldIndex = orderedColumns.findIndex(
        (column) => column._id === active.id
      );
      const newIndex = orderedColumns.findIndex(
        (column) => column._id === over.id
      );
      const dndOrderedColumn = arrayMove(orderedColumns, oldIndex, newIndex);
      setOrderedColumns(dndOrderedColumn);
    }
    setActiveDragItemData(null)
    setActiveDragItemId(null)
    setActiveDragItemType(null)
  };

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <Box
        sx={{
          width: "100%",
          height: (theme) => theme.trello.BoardContentHeight,
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#2c3e50" : "#1565c",
        }}
      >
        <ListColumns columns={orderedColumns} />
        <DragOverlay>
          {(!activeDragItemId || activeDragItemType) && null}
          {( activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={ activeDragItemData}/>}
          {( activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={ activeDragItemData}/>}
        </DragOverlay>
      </Box>
    </DndContext>
  );
};

export default BoardContent;
