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
      <FacebookShareButton url = {URL}>
        <FacebookIcon size={50} />
      </FacebookShareButton>
      <TwitterShareButton url={URL}> 
        <TwitterIcon size={50} />
      </TwitterShareButton>
      </>
  )
}