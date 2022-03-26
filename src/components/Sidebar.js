import { useEffect, useCallback, memo } from "react";
import MenuItems from "./MenuItems";
import UserInfo from "./UserInfo";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowDown } from "react-icons/io";
import { GoPlus } from "react-icons/go";
import { SiSharp } from "react-icons/si";
import { RiEdit2Fill } from "react-icons/ri";
import { BsFillTrashFill } from "react-icons/bs";
import IconButton from "@mui/material/IconButton";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllRooms, removeRoom, updateRoom } from "../store/slices/RoomSlice";
import { Link } from "react-router-dom";
import Pusher from "pusher-js";
import { useNavigate } from "react-router-dom";
const pusher = new Pusher("dcd11c74e615ba954f7b", {
  cluster: "eu",
});

const Sidebar = () => {
  const { getAccessTokenSilently, user } = useAuth0();
  const navigate = useNavigate();
  const { rooms } = useSelector((state) => state.room);
  const dispatch = useDispatch();

  console.log(rooms);
  // get All Rooms
  const getAllChannels = useCallback(async () => {
    const token = await getAccessTokenSilently();
    dispatch(getAllRooms(token));
  }, [dispatch, getAccessTokenSilently]);

  // delete room
  const deleteChannel = async (id) => {
    const imSure = window.confirm(
      "Are you sure, you want to remove this room?"
    );
    if (imSure) {
      const token = await getAccessTokenSilently();
      dispatch(removeRoom({ id, token }));
      navigate("/");
    }
  };

  // update Room
  const updateChannelName = async (id) => {
    const name = prompt("Enter new name in your room here:");

    if (name?.trim()) {
      const token = await getAccessTokenSilently();
      dispatch(updateRoom({ id, name, token }));
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (rooms?.length === 0) getAllChannels();
    }, 50);
    return () => clearTimeout(timer);
  }, [getAllChannels, rooms?.length]);

  useEffect(() => {
    const channel = pusher.subscribe("rooms");
    channel.bind("inserted", async () => {
      getAllChannels();
    });

    channel.bind("updated", async () => {
      getAllChannels();
    });

    channel.bind("deleted", async () => {
      getAllChannels();
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe("rooms");
    };
  }, [getAllChannels]);

  const { sliderToggle } = useSelector((state) => state.general);
  return (
    <aside
      className={`h-full bg-gray-900 w-[250px] pt-[56px] text-white overflow-y-auto  ${
        sliderToggle ? "-ml-[250px]" : "ml-0"
      } transition-all`}
    >
      {/* user info */}
      <UserInfo />
      {/* items */}
      <MenuItems icon={<IoIosArrowDown />} title="channels" header />
      <MenuItems icon={<GoPlus />} addChannel title="add channel" header />
      {/* channels */}

      {rooms?.map((channel) => {
        return (
          <div key={channel._id} className="flex justify-between pr-2">
            <Link to={`/room/${channel._id}`}>
              <MenuItems icon={<SiSharp />} title={channel.name} />
            </Link>
            {channel.roomOwner === user.email ? (
              <div className="flex items-center gap-x-1">
                <IconButton
                  size="small"
                  onClick={() => updateChannelName(channel._id)}
                >
                  <RiEdit2Fill color="#ffff" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => deleteChannel(channel._id)}
                >
                  <BsFillTrashFill color="#ffff" />
                </IconButton>
              </div>
            ) : null}
          </div>
        );
      })}
    </aside>
  );
};

export default memo(Sidebar);
