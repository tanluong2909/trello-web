import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Column from "./Column/Column";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addColumn } from "../../../../redux/auth"
const ListColumns = ({ columns, createNewColumn, createNewCard }) => {
  const [newColumn, setNewColumn] = useState(true)
  const [loading, setLoading] = useState(true)
  const [newColumnTitle, setNewColumnTitle] = useState('')
  const dispatch = useDispatch()
  useEffect(() => {
    if ( columns ) {
      setLoading(false)
    }
  }, [columns])

  const toggledNewColumn = () => setNewColumn(!newColumn)
  
  const addNewColumn = async () => {
    if(!newColumnTitle){
      toast.error('Please enter column title!');
      return
    }
    // Goi API tai day
    const newColumnData = {
      title: newColumnTitle
    }
    await createNewColumn(newColumnData)
    dispatch(addColumn(newColumnData))
    setNewColumnTitle('')
    toggledNewColumn()
  }
  return (
    <SortableContext items={columns?.map(column => column._id)} strategy={horizontalListSortingStrategy}>
      <Box
        sx={{
          bgcolor: "inherit",
          height: "100%",
          width: "100%",
          display: "flex",overflowX: "auto",
          overflowY: "hidden",
            "&::-webkit-scrollbar-track": {
              m: "0 16px",
            },
        }}
      >
        {/* {Column} */}
        {(loading ? Array.from(new Array(4)) : columns).map((column) => {
          return column ? <Column key={column._id} column={column} createNewCard={createNewCard} /> : 
          <Stack 
            spacing={1} 
            sx={{
              m: 1,
              pt: 0,
              '&.MuiStack-root': {
                marginTop: '-10px',
              }
            }}>
            <Skeleton 
              variant="text" 
              sx={{ 
                fontSize: '2rem', 
                bgcolor: 'white',
                pt: 0,

              }} 
            />
            <Skeleton 
              variant="rectangular" 
              width={210} 
              height={60} 
              sx={{
                minWidth: "300px",
                maxWidth: "300px",
                bgcolor: 'white', 
                ml: 2,
                borderRadius: "6px",
               
              }}
            />
            <Skeleton 
              variant="rectangular" 
              width={210} 
              height={60} 
              sx={{
                minWidth: "300px",
                maxWidth: "300px",
                bgcolor: 'white',
                ml: 2,
                borderRadius: "6px",
              }}
            />
            <Skeleton 
              variant="rectangular" 
              width={210} 
              height={60} 
              sx={{
                minWidth: "300px",
                maxWidth: "300px",
                bgcolor: 'white',
                ml: 2,
                borderRadius: "6px",
              }}
            />
            
          </Stack>;
        })}
        {newColumn 
        ? <Box
            onClick={toggledNewColumn}
            sx={{
              minWidth: "200px",
              maxWidth: "200px",
              mx: 2,
              borderRadius: "6px",
              height: "fit-content",
              bgcolor: "#ffffff3d",
            }}
          >
            <Button
              startIcon={<NoteAddIcon />}
              sx={{
                color: "white",
                width: "100%",
                justifyContent: "flex-start",
                pl: 2.5,
                py: 1,
              }}
            >
              Add new column
            </Button>
         </Box> 
        : <Box
            sx={{
              minWidth: "250px",
              maxWidth: "250px",
              mx: 2,
              p: 1,
              borderRadius: "6px",
              height: "fit-content",
              bgcolor: "#ffffff3d",
              display: "flex",
              flexDirection: "column",
              gap: 1
            }}
          >
            <TextField
              label="Enter column title"
              type="text"
              size="small"
              variant="outlined"
              autoFocus
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
            
              sx={{
                minWidth: "200px",
                maxWidth: "200px",
                "& label.Mui-focused": { color: "white" },
                "& .MuiOutlinedInput-root": {
                  '&.Mui-focused fieldset': {
                    borderColor: "white",
                  },
                  '&:hover fieldset': {
                    borderColor: "white",
                  }
                }
              }}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1
              }}
            >
              <Button
                onClick={addNewColumn}
                variant="contained"
                color="success"
                sx={{
                  
                }}
              >
                Add new column
              </Button>
              <CloseIcon
                sx={{
                  color: "white",
                  cursor: "pointer",
                  "&:hover": {color: (theme) => theme.palette.error.light}
                }}
                onClick={toggledNewColumn}
              />
            </Box>
        </Box>
      }
      </Box>
    </SortableContext>
  );
};

export default ListColumns;
