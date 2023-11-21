import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Card as MuiCard } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import GroupIcon from "@mui/icons-material/Group";
import CommentIcon from "@mui/icons-material/Comment";
import AttachmentIcon from "@mui/icons-material/Attachment";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';


const Card = ({ card }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({id: card._id, data: {...card}} );
  const dndKitCard = {
    touchAction: 'none',
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    border: isDragging ? '1px solid black' : undefined
  };

  const shouldShowCardAction = () => {
    return (
      !!card?.memberIds?.length ||
      !!card?.comments?.length ||
      !!card?.attachments?.length
    );
  };

  return (
    <MuiCard
      ref={setNodeRef} 
      style={dndKitCard} 
      {...attributes} 
      {...listeners}
      sx={{
        cursor: "pointer",
        boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
        // overflow: "unset",
        // display: card?.FE_PlaceholderCard ? 'none' : 'block'
        overflow: card?.FE_PlaceholderCard ? 'hide' : 'unset',
        height: card?.FE_PlaceholderCard ? '0px' : 'unset',
        border: card.FE_PlaceholderCard ? 'none': '1px solid transparent',
        '&:hover': {
          borderColor: (theme) => theme.palette.primary.main,
          // endIcon: <ModeEditIcon/>
        }
      }}
      
    >
      {card?.cover && (
        <CardMedia
          sx={{ height: 140 }}
          image={card.cover}
          title="green iguana"
        />
      )}
      <CardContent  
        sx={{ 
          p: 0,
          "&:last-child": { p: '0px' } ,
          display: 'flex',
          alignItems: 'center',
          m: 1,
          justifyContent: 'space-between',
          '&:hover :last-child': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
          }} >
        <Button 
          sx={{
            mt: 0,
          }} 
          variant="h6" 
        >
          {card?.title}
        </Button>
        <Button 
          sx={{
              display: 'none',
              borderRadius: '10px',
            }} >
          <ModeEditIcon 
            
          />
        </Button>
      </CardContent>

      {shouldShowCardAction() && (
        <CardActions sx={{ p: "0 4px 8px 4px" }}>
          {!!card?.memberIds?.length && (
            <Button size="small" startIcon={<GroupIcon />}>
              {card?.memberIds?.length}
            </Button>
          )}
          {!!card?.comments?.length && (
            <Button size="small" startIcon={<CommentIcon />}>
              {!!card?.comments && card?.comments?.length}
            </Button>
          )}
          {!!card?.attachments?.length && (
            <Button size="small" startIcon={<AttachmentIcon />}>
              {card?.attachments?.length}
            </Button>
          )}
        </CardActions>
      )}
    </MuiCard>
  );
};

export default Card;
