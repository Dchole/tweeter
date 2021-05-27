import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import SettingsIcon from "@material-ui/icons/Settings"
import PersonIcon from "@material-ui/icons/Person"
import GroupIcon from "@material-ui/icons/Group"
import LogoutIcon from "@material-ui/icons/ExitToApp"

interface IMenuProps {
  open: boolean
  anchorEl: HTMLButtonElement
  handleClose: () => void
}

const MenuOptions: React.FC<IMenuProps> = ({ open, anchorEl, handleClose }) => {
  return (
    <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText>My Profile</ListItemText>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText>Group Chat</ListItemText>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText>Settings</ListItemText>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText>Logout</ListItemText>
      </MenuItem>
    </Menu>
  )
}

export default MenuOptions
