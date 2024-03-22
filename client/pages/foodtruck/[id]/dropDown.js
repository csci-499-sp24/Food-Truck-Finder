import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";

export default function DropDown() {
    return (
        <>

<FormControl>
        <InputLabel id="demo-simple-select-label">Share Via</InputLabel>
        <Select
          color="secondary"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
          variant="standard"
          sx={{
            width: 100,
            background: "white",
          }}
        >
          <MenuItem value={10}>Facebook</MenuItem>
          <MenuItem value={20}>INSTAGRAM</MenuItem>
          <MenuItem value={30}>TEXT</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Language</InputLabel>
        <Select
          color="secondary"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
          variant="standard"
          sx={{
            width: 100,
            background: "white",
          }}
        >
          <MenuItem value={10}>ENGLISH</MenuItem>
          <MenuItem value={20}>FRENCH</MenuItem>
          <MenuItem value={30}>SPANISH</MenuItem>
        </Select>
      </FormControl>
        </>
    )
}