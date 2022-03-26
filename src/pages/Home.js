import ChatHeader from "../components/ChatHeader";
import Message from "../components/Message";
import Messages from "../components/Messages";
import { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMessages, getRoom } from "../store/slices/RoomSlice";
import Pusher from "pusher-js";
import FlipMove from "react-flip-move";
import { css } from "@emotion/css";
import ScrollToBottom from "react-scroll-to-bottom";

const ROOT_CSS = css({
  flex: 1,
  padding: "8px 24px",
  overflowY: "auto",
});

const pusher = new Pusher("dcd11c74e615ba954f7b", {
  cluster: "eu",
});
const Home = () => {
  const { messages } = useSelector((state) => state.room);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  const getChannel = useCallback(async () => {
    const token = await getAccessTokenSilently();
    dispatch(getRoom({ id, token }));
  }, [dispatch, getAccessTokenSilently, id]);

  useEffect(() => {
    getChannel();
  }, [getChannel, id]);

  useEffect(() => {
    const channel = pusher.subscribe("rooms");
    channel.bind("updated", () => {
      getChannel();
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe("rooms");
    };
  }, [getChannel]);

  // get all messages
  const getAllMessagesInRoom = useCallback(async () => {
    const token = await getAccessTokenSilently();
    dispatch(getAllMessages({ id, token }));
  }, [dispatch, getAccessTokenSilently, id]);
  useEffect(() => {
    getAllMessagesInRoom();
  }, [getAllMessagesInRoom, id]);

  useEffect(() => {
    const channel = pusher.subscribe("messages");
    channel.bind("inserted", async (message) => {
      getAllMessagesInRoom();
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe("messages");
    };
  }, [getAllMessagesInRoom]);

  return (
    <div className="flex-1 pt-[60px] flex flex-col">
      <ChatHeader />
      <ScrollToBottom className={ROOT_CSS}>
        <FlipMove className="flex flex-col gap-y-3">
          {messages.length
            ? messages?.map((message) => {
                return <Messages key={message._id} {...message} />;
              })
            : null}
        </FlipMove>
      </ScrollToBottom>
      <Message />
    </div>
  );
};

export default Home;
