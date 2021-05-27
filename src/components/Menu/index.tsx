import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"

interface IMenuProps {
  open: boolean
  anchorEl: HTMLButtonElement
  handleClose: () => void
}

const MenuOptions: React.FC<IMenuProps> = ({ open, anchorEl, handleClose }) => {
  return (
    <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
      <MenuItem onClick={handleClose}>My Profile</MenuItem>
      <MenuItem onClick={handleClose}>Group Chat</MenuItem>
      <MenuItem onClick={handleClose}>Settings</MenuItem>
      <MenuItem onClick={handleClose}>Logout</MenuItem>
    </Menu>
  )
}

export default MenuOptions
