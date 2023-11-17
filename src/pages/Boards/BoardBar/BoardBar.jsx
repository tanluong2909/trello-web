import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import DashboardIcon from "@mui/icons-material/Dashboard";
import VpnLockIcon from "@mui/icons-material/VpnLock";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import BoltIcon from "@mui/icons-material/Bolt";
import FilterListIcon from "@mui/icons-material/FilterList";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { Tooltip } from "@mui/material";
const BoardBar = ({ board }) => {
  const StyleChip = {
    "& .MuiSvgIcon-root": {
      color: "white",
    },
    color: "white",
    borderRadius: "5px",
    bgcolor: "transparent",
    cursor: "pointer",
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: (theme) => theme.trello.boardBarHeight,
        backgroundColor: "background.paper",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 1,
        overflowX: "auto",
        paddingX: "5px",
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#2c3e50" : "#1565c",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Chip
          clickable
          sx={StyleChip}
          icon={<DashboardIcon />}
          label={board?.title}
        />
        <Chip
          clickable
          sx={StyleChip}
          icon={<VpnLockIcon />}
          label={board?.type?.charAt(0).toUpperCase() + board?.type?.slice(1)}
        />
        <Chip
          clickable
          sx={StyleChip}
          icon={<AddToDriveIcon />}
          label="Add To Google Drive"
        />
        <Chip clickable sx={StyleChip} icon={<BoltIcon />} label="Automation" />
        <Chip
          clickable
          sx={StyleChip}
          icon={<FilterListIcon />}
          label="Filters"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Button
          startIcon={<PersonAddIcon />}
          variant="outlined"
          sx={{
            color: "white",
            borderColor: "white",
            "&:hover": {
              borderColor: "white",
            },
          }}
        >
          Invite
        </Button>
        <AvatarGroup
          max={4}
          total={14}
          sx={{
            gap: "10px",
            "& .MuiAvatar-root": {
              width: 34,
              height: 34,
              fontSize: "1rem",
              border: "none",
            },
          }}
        >
          <Tooltip title="Remy Sharp">
            <Avatar
              sx={{}}
              alt="Remy Sharp"
              src=""
            />
          </Tooltip>
          <Tooltip title="Travis Howard">
            <Avatar
              sx={{}}
              alt="Travis Howard"
              src=""
            />
          </Tooltip>
          <Tooltip title="Travis Howard">
            <Avatar
              sx={{}}
              alt="Agnes Walker"
              src=""
            />
          </Tooltip>
          <Avatar
            sx={{}}
            alt="Trevor Henderson"
            src=""
          />
        </AvatarGroup>
      </Box>
    </Box>
  );
};

export default BoardBar;
