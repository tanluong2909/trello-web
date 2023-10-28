import Box from "@mui/material/Box";
import ListColumns from "./ListColumns/ListColumns";
import { mapOrder } from "../../../utils/sorts";
import {
  DndContext,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
const BoardContent = ({ board }) => {
  const [orderedColumns, setOrderedColumns] = useState([]);
  // const pointerSensor = useSensor(PointerSensor, {
  //   activationConstraint: { distance: 10 },
  // });
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 10 },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 250, tolerance: 50},
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, "_id"));
  }, [board]);
  const handleDragEnd = (event) => {
    console.log(event);
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
  };

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <Box
        sx={{
          width: "100%",
          height: (theme) => theme.trello.BoardContentHeight,
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#2c3e50" : "#1565c",
        }}
      >
        <ListColumns columns={orderedColumns} />
      </Box>
    </DndContext>
  );
};

export default BoardContent;
