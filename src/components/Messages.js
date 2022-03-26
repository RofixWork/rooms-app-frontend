import Avatar from "@mui/material/Avatar";
import { forwardRef } from "react";
const Messages = forwardRef(({ message, user, picture, createdAt }, ref) => {
  return (
    <div className="flex items-center gap-x-2" ref={ref}>
      <Avatar
        src={picture}
        alt={user}
        sx={{ background: "#222", color: "white" }}
      >
        {user[0]}
      </Avatar>
      <div>
        <h3 className="text-sm font-semibold">
          {user}
          <span className="text-gray-500 font-[400] ml-1">
            {new Date(createdAt).toUTCString()}
          </span>
        </h3>
        <h4 className="text-base font-[500]">{message}</h4>
      </div>
    </div>
  );
});

export default Messages;
