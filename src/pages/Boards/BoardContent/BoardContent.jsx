import Box from "@mui/material/Box";
import ListColumns from "./ListColumns/ListColumns";
import { useCallback, useEffect, useState, useRef } from "react";
import { mapOrder } from "../../../utils/sorts";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
  closestCenter,
  pointerWithin,
  rectIntersection,
  getFirstCollision
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import Column from "./ListColumns/Column/Column";
import Card from "./ListColumns/Column/ListCards/Card/Card";
import { cloneDeep, filter, isEmpty } from "lodash";
import { generatePlaceholderCard } from "../../../utils/formatters";
const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: "ACTIVE_DRAG_ITEM_TYPE_COLUMN",
  CARD: "ACTIVE_DRAG_ITEM_TYPE_CARD",
};

const BoardContent = ({ board, createNewColumn, createNewCard, moveColumns }) => {
  const [orderedColumns, setOrderedColumns] = useState([]);
  const [activeDragItemId, setActiveDragItemId] = useState(null);
  const [activeDragItemType, setActiveDragItemType] = useState(null);
  const [activeDragItemData, setActiveDragItemData] = useState(null);
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] =
    useState(null);
  const lastOverId = useRef(null);
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
  const findColumByCardId = (cardId) => {
    return orderedColumns.find((column) =>
      column.cards.map((card) => card._id)?.includes(cardId)
    );
  };

  const moveCardBetweenDifferentColumns = (overColumn, overCardId, active, over, activeColumn, activeDraggingCardId, activeDraggingCardData) => {
    setOrderedColumns((prevColumn) => {
      const overCardIndex = overColumn?.cards?.findIndex(
        (card) => card._id === overCardId
      );

      let newCardIndex;
      const isBelowOverItem =
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height;

      const modifier = isBelowOverItem ? 1 : 0;
      newCardIndex =
        overCardIndex >= 0
          ? overCardIndex + modifier
          : overColumn?.cards?.length + 1;

      const nextColumns = cloneDeep(prevColumn);
      const nextActiveColumn = nextColumns.find(
        (column) => column._id === activeColumn._id
      );
      const nextOverColumn = nextColumns.find(
        (column) => column._id === overColumn._id
      );

      if (nextActiveColumn) {
        nextActiveColumn.cards = nextActiveColumn.cards.filter(
          (card) => card._id !== activeDraggingCardId
        );

        if (isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
        }

        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
          (card) => card._id
        );
      }

      if (nextOverColumn) {
        nextOverColumn.cards = nextOverColumn.cards.filter(
          (card) => card._id !== activeDraggingCardId
        );
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(
          newCardIndex,
          0,
          {
            ...activeDraggingCardData, columnId: nextOverColumn._id
          }
        );

        nextOverColumn.cards = nextOverColumn.cards.filter(card => !card.FE_PlaceholderCard)

        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
          (card) => card._id
        );
      }

      return nextColumns;
    });
  }
  const handleDragStart = (event) => {
    setActiveDragItemId(event?.active?.id);
    setActiveDragItemType(
      event?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    );
    setActiveDragItemData(event?.active?.data?.current);
    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumByCardId(event?.active?.id));
    }
  };

  const handleDragOver = (event) => {
    // Nếu kéo column thì không làm gì cả
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      return;
    }

    const { active, over } = event;
    if (!active || !over) {
      return;
    }

    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData },
    } = active;
    const { id: overCardId } = over;

    const activeColumn = findColumByCardId(activeDraggingCardId);
    const overColumn = findColumByCardId(overCardId);

    if (!activeColumn || !overColumn) {
      return;
    }

    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenDifferentColumns(overColumn, overCardId, active, over, activeColumn, activeDraggingCardId, activeDraggingCardData)
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || !active) return;

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const {
        id: activeDraggingCardId,
        data: { current: activeDraggingCardData },
      } = active;
      const { id: overCardId } = over;

      const activeColumn = findColumByCardId(activeDraggingCardId);
      const overColumn = findColumByCardId(overCardId);

      if (!activeColumn || !overColumn) {
        return;
      }

      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        moveCardBetweenDifferentColumns(overColumn, overCardId, active, over, activeColumn, activeDraggingCardId, activeDraggingCardData)
      } else {
        const oldCardIndex = oldColumnWhenDraggingCard?.cards.findIndex(
          (card) => card._id === activeDragItemId
        );
        const newCardIndex = overColumn?.cards.findIndex(
          (card) => card._id === overCardId
        );
        const dndOrderedCards = arrayMove(
          oldColumnWhenDraggingCard?.cards,
          oldCardIndex,
          newCardIndex
        );
        setOrderedColumns(prevColumns => {
          const nextColumns = cloneDeep(prevColumns)
          const targetColumn = nextColumns.find(column => column._id === overColumn._id)

          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCards.map(card => card._id)
          return nextColumns
        })
      }
    }

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id !== over.id) {
        const oldColumnIndex = orderedColumns.findIndex(
          (column) => column._id === active.id
        );
        const newColumnIndex = orderedColumns.findIndex(
          (column) => column._id === over.id
        );
        const dndOrderedColumns = arrayMove(  
          orderedColumns,
          oldColumnIndex,
          newColumnIndex
        );
        moveColumns(dndOrderedColumns)
        setOrderedColumns(dndOrderedColumns)
      }
    }
    setActiveDragItemData(null);
    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setOldColumnWhenDraggingCard(null);
  };

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: 0.5,
        },
      },
    }),
  };

  const collisionDetectionStrategy = useCallback((args) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN){
      return closestCorners({...args})
    }

    const pointerIntersections = pointerWithin(args)

    if( !pointerIntersections.length ) {
      return
    }
    // const intersections = pointerIntersections?.length > 0 ? pointerIntersections : rectIntersection(args)

    let overId = getFirstCollision(pointerIntersections, 'id')

    if (overId) {
      const checkColumn = orderedColumns.find(column => column._id === overId)

      if (checkColumn) {
        overId = closestCorners({
          ...args,
          droppableContainers: args.droppableContainers.filter(container => {
            return  (container.id !== overId) && (checkColumn?.cardOrderIds?.includes(container.id))
          })
        })[0]?.id
      }

      lastOverId.current = overId
      return [{id: overId }]
    }

    return lastOverId.current ? [{id: lastOverId.current}] : []
  }, [activeDragItemType, orderedColumns])

  return (
    <DndContext
      sensors={sensors}
      // collisionDetection={closestCorners}
      collisionDetection={collisionDetectionStrategy}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <Box
        sx={{
          width: "100%",
          height: (theme) => theme.trello.boardContentHeight,
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#2c3e50" : "#1565c",
          p: '10px 0'
        }}
      > 
        <ListColumns columns={orderedColumns} createNewColumn={createNewColumn} createNewCard={createNewCard} />
        <DragOverlay dropAnimation={dropAnimation}>
          {activeDragItemType && null}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
            <Column column={activeDragItemData} />
          )}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
            <Card card={activeDragItemData} />
          )}
        </DragOverlay>
      </Box>
    </DndContext>
  );
};

export default BoardContent;
