// 'use client'
// import {
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
// } from "@mui/material";
// import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from 'next-share';

// export default function DropDown(props) {
//   const URL = props.URL;
//   return (
//       <>

// <FormControl>
//       <InputLabel id="demo-simple-select-label">Share Via</InputLabel>
//       <FacebookShareButton
//         url = {URL}
//       >
//         <FacebookIcon size={32} />
//       </FacebookShareButton>
//       <TwitterShareButton url={URL}> 
//         <TwitterIcon size={32} />
//       </TwitterShareButton>
//     </FormControl>
//     <FormControl>
//       <InputLabel id="demo-simple-select-label">Language</InputLabel>
//       <Select
//         color="secondary"
//         labelId="demo-simple-select-label"
//         id="demo-simple-select"
//         label="Age"
//         variant="standard"
//         sx={{
//           width: 150,
//           background: "#105372",
//           color: "white"
//         }}
//       >
//         <MenuItem value={10}>ENGLISH</MenuItem>
//         <MenuItem value={20}>FRENCH</MenuItem>
//         <MenuItem value={30}>SPANISH</MenuItem>
//       </Select>
//     </FormControl>
//       </>
//   )
// }
'use client';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  MenuProps,
} from "@mui/material";
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from 'next-share';

export default function DropDown(props) {
  const URL = props.URL;

  
  // Define menu props to customize the behavior of the dropdown
//   const selectMenuProps = {
//     PaperProps: {
//       style: {
//         maxHeight: 150, // Adjust the maximum height as needed
//       },
//     },
//   };

  return (
      <>
      <FacebookShareButton url = {URL}>
        <FacebookIcon size={50} />
      </FacebookShareButton>
      <TwitterShareButton url={URL}> 
        <TwitterIcon size={50} />
      </TwitterShareButton>
    {/* <FormControl>
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
    </FormControl> */}
      </>
  )
}

