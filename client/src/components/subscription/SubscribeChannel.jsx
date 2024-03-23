import React from 'react'
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";

const SubscribeChannel = ({ sub }) => {
  return (
    <div className='ml-3 mt-2 mb-4 flex items-center gap-3'>
        <Avatar
          size={"xs"}
          src={sub?.snippet?.thumbnails?.default?.url}
          className="mt-1"
        />
        <span className='mt-1'>{sub?.snippet?.title.slice(0, 20)}{sub?.snippet?.title.length > 20 && "..."}</span>
    </div>
  )
}

export default SubscribeChannel