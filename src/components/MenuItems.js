import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { createRoom } from "../store/slices/RoomSlice";
const MenuItems = ({ title, icon, header, addChannel }, ref) => {
  const { user, getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();

  const addChannelFn = async () => {
    const name = prompt("Enter name your channel here:");

    if (name?.trim()) {
      const token = await getAccessTokenSilently();
      const room = { name, roomOwner: user.email };
      dispatch(createRoom({ room, token }));
    }
  };
  return (
    <article
      onClick={addChannel ? addChannelFn : null}
      className={`px-4  flex items-center gap-x-1  ${
        header ? "py-2 border-b border-gray-50 border-opacity-40" : "py-[10px]"
      } cursor-pointer capitalize font-[500] text-base`}
    >
      {icon}
      <span>{title}</span>
    </article>
  );
};

export default MenuItems;
