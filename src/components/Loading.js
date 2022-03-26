import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen grid place-items-center">
      <div className="w-[80px] h-[80px] border-[10px] border-gray-200 border-t-gray-900 border-b-gray-900 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
