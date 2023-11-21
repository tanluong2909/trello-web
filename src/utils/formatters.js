export const generatePlaceholderCard = (column) => {
    return {
        _id: `${column._id}-placeholder-card`,
        boardId: column.boardId,
        columnId: column._id,
        FE_PlaceholderCard: true,
    }
} 

export const styleTextField = {
    "& label.Mui-focused": { color: "white" },
                "& .MuiOutlinedInput-root": {
                //   '&.Mui-focused fieldset': {
                //     borderColor: "white",
                //   },
                  '&:hover fieldset': {
                    borderColor: "white",
                  }
                }
}