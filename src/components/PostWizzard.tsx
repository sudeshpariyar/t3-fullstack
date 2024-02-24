import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

const PostWizzard = () => {
  const { user } = useUser();
  if (!user) return null;

  return (
    <div className="flex w-full gap-4">
      <Image
        className="rounded-full"
        src={user.imageUrl}
        alt="Profile image"
        width={56}
        height={56}
      />
      <input
        placeholder="Whats happening!!"
        className="grow  bg-transparent outline-none"
      />
    </div>
  );
};

export default PostWizzard;
