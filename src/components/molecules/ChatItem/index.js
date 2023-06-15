import React from 'react';
import IsMe from './IsMe';
import Other from './Other';

const ChatItem = ({isMe, text, date, avatar}) => {
  if (isMe) {
    return <IsMe text={text} date={date} />;
  }
  return <Other text={text} date={date} avatar={avatar} />;
};

export default ChatItem;
