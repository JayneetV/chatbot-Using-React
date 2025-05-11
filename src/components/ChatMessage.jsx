import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ChatMessage = ({ chat }) => {
  const isBot = chat.role === 'bot';
  return (
    <div className={`flex ${isBot ? 'justify-start markdown-body' : 'justify-end'} w-full px-3`}>
      <div className={`max-w-[90%] md:max-w-[80%] ${isBot ? 'bg-[#1f1f1f] rounded-b-2xl rounded-tr-2xl' : 'bg-[#333333] rounded-b-2xl rounded-tl-2xl'} px-5 py-2`}>
        <ReactMarkdown children={chat.text} remarkPlugins={[remarkGfm]} />
      </div>
    </div>
  );
}

export default ChatMessage;