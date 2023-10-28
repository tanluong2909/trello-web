import { useColorScheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

function BasicSelect() {
  const { mode, setMode } = useColorScheme();

  const handleChange = (event) => {
    const selectMode = event.target.value;
    setMode(selectMode);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl>
        <InputLabel
          id="demo-simple-select-label"
          sx={{
            "&.Mui-focused": { color: "white" },
          }}
        >
          Mode
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={mode}
          label="Mode"
          onChange={handleChange}
          size='small'
          sx={{
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
            "& .MuiSvgIcon-root": { color: "white"}
          }}
        >
          <MenuItem value="light">
            <div style={{ display: "flex", justifyContent: "center", gap: 5 }}>
              <LightModeIcon fontSize="small" /> Light
            </div>
          </MenuItem>
          <MenuItem value="dark">
            <div style={{ display: "flex", justifyContent: "center", gap: 5 }}>
              <DarkModeOutlinedIcon fontSize="small" />
              Dark
            </div>
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default BasicSelect;
