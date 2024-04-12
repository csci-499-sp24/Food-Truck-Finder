'use client'
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from 'next-share';

export default function DropDown(props) {
  const URL = props.URL;
  return (
      <>

<FormControl>
      <InputLabel id="demo-simple-select-label">Share Via</InputLabel>
      <FacebookShareButton
        url = {URL}
      >
        <FacebookIcon size={32} />
      </FacebookShareButton>
      <TwitterShareButton url={URL}> 
        <TwitterIcon size={32} />
      </TwitterShareButton>
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
          width: 150,
          background: "#105372",
          color: "white"
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