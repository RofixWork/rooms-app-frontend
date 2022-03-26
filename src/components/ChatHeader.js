import { useSelector } from "react-redux";

const ChatHeader = () => {
  const { room } = useSelector((state) => state.room);
  return (
    <div className="px-6 py-2 border-b border-gray-200 shadow-sm">
      <h3 className="font-semibold capitalize text-lg">
        {room ? room?.name : "..."}
      </h3>
    </div>
  );
};

export default ChatHeader;
