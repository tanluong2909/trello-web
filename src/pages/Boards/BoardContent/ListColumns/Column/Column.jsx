import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import ContentCut from "@mui/icons-material/ContentCut";
import Cloud from "@mui/icons-material/Cloud";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import AddCardIcon from "@mui/icons-material/AddCard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Button from "@mui/material/Button";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import ListCards from "./ListCards/ListCards";
import { mapOrder } from "../../../../../utils/sorts";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from 'react-toastify'
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";


const Column = ({ column, createNewCard }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: column._id , data: { ...column } });
  const dndKitColumn = {
    touchAction: "none",
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [newCard, setNewCard] = useState(true)
  const [newCardTitle, setNewCardTitle] = useState('')
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = ({ column, createNewCard }) => {
    setAnchorEl(null);
  };

  const orderedCard = mapOrder(column?.cards, column?.cardOrderIds, "_id");
  

  const toggledNewCard =  () => setNewCard(!newCard)
  const addNewCard = async () => {
    if(!newCardTitle){
      toast.error('Please enter card title!', {position: 'bottom-right'});
      return
    }
    // Goi API tai day
    const newCardData = {
      title: newCardTitle,
      columnId: column._id
    }
    await createNewCard(newCardData)
    setNewCardTitle('')
    toggledNewCard()
  }
  return (
    <div ref={setNodeRef} style={dndKitColumn} {...attributes} >
      <Box
        {...listeners}
        sx={{
          minWidth: "300px",
          maxWidth: "300px",
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#333643" : "#ebecf0",
          ml: 2,
          borderRadius: "6px",
          height: "fit-content",
          maxHeight: (theme) =>
            `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`,
        }}
      >
        {/* {Header} */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 2,
            flexDirection: "row",
            height: (theme) => theme.trello.columnHeaderHeight,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            {column.title}
          </Typography>
          <Box>
            <Tooltip title="More options">
              <KeyboardArrowDownIcon
                id="basic-column-dropdown"
                aria-controls={open ? "basic-menu-column-dropdown" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                sx={{
                  cursor: "pointer",
                }}
              />
            </Tooltip>
            <Menu
              id="basic-menu-column-dropdown"
              aria-labelledby="basic-column-dropdown"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              sx={{
                mt: 4,
              }}
            >
              <MenuItem>
                <ListItemIcon>
                  <AddCardIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Add new card</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCopyIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Copy</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCut fontSize="small" />
                </ListItemIcon>
                <ListItemText>Cut</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentPasteIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Paste</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem>
                <ListItemIcon>
                  <DeleteForeverIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Remove this column</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <Cloud fontSize="small" />
                </ListItemIcon>
                <ListItemText>Archive this column</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
        {/* {ListCard} */}
        <ListCards cards={orderedCard} />
        {/* {Footer} */}
        <Box
          sx={{
            width: '100%',
            p: 1,
            flexDirection: "row",
            height: (theme) => theme.trello.columnFooterHeight,
          }}
        >
        {newCard 
        ? <Box
            sx={{
              borderRadius: "6px",
              height: "fit-content",
              bgcolor: "#ffffff3d",
              display: "flex",
              alignItems: "center",
              p: 1,
              justifyContent: "space-between",
            }}
          >
            <Button onClick={toggledNewCard} startIcon={<AddCardIcon/>}>Add new card</Button>
          <Tooltip title="Drag to move">
            <DragHandleIcon sx={{ cursor: "pointer" }} />
          </Tooltip>
         </Box> 
        : <Box
            sx={{
              width: "100%",
              p: 1,
              borderRadius: "6px",
              height: "fit-content",
              bgcolor: "#ffffff3d",
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              gap: 1
            }}
          >
            <TextField
              label="Enter column title"
              type="text"
              size="small"
              variant="outlined"
              autoFocus
              value={newCardTitle}
              onChange={(e) => setNewCardTitle(e.target.value)}
            
              sx={{
                minWidth: "170px",
                maxWidth: "170px",
                "& .MuiFormLabel-root": {
                  color: (theme) => theme.palette.mode === "dark" ? "white" : "black",
                },
                "& input": {
                  color: (theme) => theme.palette.mode === "dark" ? "white" : "black",
                  bgcolor: (theme) => theme.palette.mode === "dark" ? "#333643" : "white",
                },
                "& label.Mui-focused": { color: (theme) => theme.palette.primary.main, },
                "& .MuiOutlinedInput-root": {
                  '& fieldset': {
                    borderColor: (theme) => theme.palette.primary.main,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: (theme) => theme.palette.primary.main,
                  },
                  '&:hover fieldset': {
                    borderColor: (theme) => theme.palette.primary.main,
                  }
                }
              }}
            />
              <Button
                onClick={addNewCard}
                variant="contained"
                color="success"
                sx={{
                  
                }}
              >
                Add
              </Button>
              <CloseIcon
                sx={{
                  cursor: "pointer",
                  color: (theme) => theme.palette.error.light
                }}
                onClick={toggledNewCard}
              />
        </Box>
      }

          
        </Box>
      </Box>
    </div>
  );
};

export default Column;
