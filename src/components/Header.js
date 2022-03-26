import IconButton from "@mui/material/IconButton";
import { VscThreeBars } from "react-icons/vsc";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import { AiOutlineLogout } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { slider } from "../store/slices/GeneralSlice";
import { useAuth0 } from "@auth0/auth0-react";
const Header = () => {
  const { user, logout } = useAuth0();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  return (
    <header className="w-full px-4 sm:px-3 py-2 flex justify-between items-center bg-gray-900 text-white fixed top-0 left-0">
      <div className="flex items-center gap-x-1">
        <IconButton onClick={() => dispatch(slider())}>
          <VscThreeBars color="white" />
        </IconButton>
        <h3 className="text-lg font-semibold">Rooms</h3>
      </div>
      <div>
        <Avatar
          onClick={() => setOpen(true)}
          className="cursor-pointer"
          sx={{
            height: 38,
            width: 38,
            bgcolor: "white",
            color: "#333",
            fontWeight: 600,
            fontFamily: "monospace",
            border: "2px solid #fff",
          }}
          src={user?.picture}
          alt="user"
        >
          {user?.name[0]}
        </Avatar>
        <Menu
          open={open}
          onClose={() => setOpen(false)}
          onClick={() => setOpen(false)}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
        >
          <MenuItem
            onClick={() =>
              logout({
                returnTo: window.location.origin,
              })
            }
          >
            <ListItemIcon>
              <AiOutlineLogout fontSize="20px" />
            </ListItemIcon>
            LogOut
          </MenuItem>
        </Menu>
      </div>
    </header>
  );
};

export default Header;
