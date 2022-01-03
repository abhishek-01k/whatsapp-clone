import * as React from 'react';
import {IconButton} from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {signOut} from '@firebase/auth';
import { auth } from '../Firebase';

export default function PositionedMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
      >
        < MoreVertIcon />
      </IconButton>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem style={{fontSize:"13.5px", lineHeight:"20px", fontWeight:"200"}}  onClick={handleClose}>New Group</MenuItem>
        <MenuItem style={{fontSize:"13.5px", lineHeight:"20px", fontWeight:"200"}} onClick={handleClose}>Archive</MenuItem>
        <MenuItem style={{fontSize:"13.5px", lineHeight:"20px", fontWeight:"200"}} onClick={handleClose}>Starred Messages</MenuItem>
        <MenuItem style={{fontSize:"13.5px", lineHeight:"20px", fontWeight:"200"}} onClick={handleClose}>Settings</MenuItem>
        <MenuItem  style={{fontSize:"13.5px", lineHeight:"20px", fontWeight:"200"}} onClick={()=>{signOut(auth)}}>Log out</MenuItem>
      </Menu>
    </>
  );
}


