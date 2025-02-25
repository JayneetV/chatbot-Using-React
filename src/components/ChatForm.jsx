import React from 'react';
import { useRef } from 'react';

const ChatForm = ({ chatHistory, setquestion, generateResponse, setchatHistory }) => {

    const inputRef = useRef();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const userMessage = inputRef.current.value.trim();
        if (!userMessage) return;// Prevent empty messages
    
        inputRef.current.value = '';

        // Add user message to chat history
        const updatedHistory = [...chatHistory, { role: 'user', text: userMessage }];
        setchatHistory(updatedHistory);

        // Call generateResponse with updated chat history
        generateResponse(updatedHistory);
    }

    return (
        <form className='relative flex items-center w-full' onSubmit={handleFormSubmit}>

            <input className=' border-[1px] border-white h-full rounded-full text-white py-3 px-5 w-full'
                ref={inputRef}
                // value={question}
                onChange={(e) => setquestion(e.target.value)}
                placeholder='Ask me anything . . .' />

            <button className='absolute right-0 bg-white py-2 px-5 rounded-full font-semibold flex justify-center items-center w-fit m-1'>Sent</button>

        </form>
    );
}

export default ChatForm;
