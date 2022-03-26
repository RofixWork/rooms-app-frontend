import Container from "@mui/material/Container";
import { BsEmojiSmile } from "react-icons/bs";
import { AiFillLike } from "react-icons/ai";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector, useDispatch } from "react-redux";
import { createMessage } from "../store/slices/RoomSlice";
import Picker from "emoji-picker-react";

const Message = () => {
  const { getAccessTokenSilently, user } = useAuth0();
  const [message, setMessage] = useState("");
  const [palletEmoji, setPalletEmoji] = useState(false);
  const { room } = useSelector((state) => state.room);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await getAccessTokenSilently();
    const data = {
      message,
      picture: user.picture,
      user: user.name,
      roomId: room._id,
    };

    dispatch(createMessage({ data, token }));
    setMessage("");
  };

  const onEmojiClick = (event, emojiObject) => {
    let emoji = message + emojiObject.emoji;
    setMessage(emoji);
  };
  return (
    <>
      {palletEmoji ? <Picker onEmojiClick={onEmojiClick} /> : null}
      <form
        className="border-t border-gray-200 py-2 px-4"
        onSubmit={handleSubmit}
      >
        <Container maxWidth="md">
          <div className="flex items-center gap-x-1">
            <IconButton
              size="medium"
              onClick={() => setPalletEmoji(!palletEmoji)}
            >
              <BsEmojiSmile fontSize="25px" />
            </IconButton>
            <input
              type="text"
              placeholder="Type your message here..."
              className="border border-gray-200 rounded-sm px-4 py-2 text-sm block w-full focus:outline-none focus:border-gray-400"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <IconButton size="medium">
              <AiFillLike fontSize="25px" />
            </IconButton>
          </div>
        </Container>
      </form>
    </>
  );
};

export default Message;
