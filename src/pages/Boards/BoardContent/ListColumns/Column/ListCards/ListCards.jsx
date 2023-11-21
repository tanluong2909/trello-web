import Box from "@mui/material/Box";
import Card from "./Card/Card";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
const ListCards = ({cards, toggledNewCard}) => {
  return (
    <SortableContext  items={cards?.map(card => card._id)} strategy={verticalListSortingStrategy}>
      <Box
        sx={{
          p: "0 5px",
          m: "0 5px",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          overflowX: "hidden",
          overflowY: "auto",
          maxHeight: (theme) =>
            `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)}  - ${
              theme.trello.columnHeaderHeight
            } - ${theme.trello.columnFooterHeight})`,
          "&::-webkit-scrollbar-thumb": {
            background: "#ced0da",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#bfc2cf",
          },
        }}
      >
        {cards.map(card => {
          return <Card key={card._id} card={card} toggledNewCard={toggledNewCard}/>
        })}
      </Box>
    </SortableContext>
  );
};

export default ListCards;
