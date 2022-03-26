import React from "react";
import { GoPrimitiveDot } from "react-icons/go";
import { useAuth0 } from "@auth0/auth0-react";
const UserInfo = () => {
  const { user } = useAuth0();
  return (
    <article className="px-4 py-1 border-t border-b border-gray-50 border-opacity-40 ">
      <h3>{user?.email}</h3>
      <h4 className="text-sm font-semibold flex items-center gap-x-1">
        <GoPrimitiveDot fontSize="16px" color="#2bd52b" /> {user?.name}
      </h4>
    </article>
  );
};

export default UserInfo;
