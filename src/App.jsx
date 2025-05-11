import { useState } from 'react';
import './App.css';
import axios from 'axios';
import ChatForm from './components/ChatForm';
import ChatMessage from './components/ChatMessage';

function App() {
  const [question, setquestion] = useState("");
  const [chatHistory, setchatHistory] = useState([]);

  const generateResponse = async (history) => {
    // Set loading state
    setchatHistory(prev => [...prev, { role: 'bot', text: "Loading..." }]);

    // Format the history to match the API's expected input
    const formattedHistory = history.map(({ role, text }) => ({ role, parts: [{ text }] }));

    const response = await axios({
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDVzoFmoJlFIVOUskR6NReHl4D28cjt8SM",
      method: "post",
      data: {
        "contents": [{
          "parts": [{ "text": question }]
        }]
      }
    });

    const botResponse = response.data.candidates[0].content.parts[0].text;

    // Update chat history with bot response
    setchatHistory(prev => [...prev.slice(0, -1), { role: 'bot', text: botResponse }]);
  }

  return (
    <>
      <div className='bg-[#181818] flex flex-col gap-2 justify-center items-center h-screen'>
        
        <div className='text-white font-bold text-2xl py-2'>AI-Based Conversational Tool</div>

        <div className='w-full md:w-[70%] h-full rounded-md flex flex-col gap-2 justify-between items-center px-2 md:px-0'>

          {/* Chat body */}
          <div className='text-white overflow-y-auto h-[85dvh] md:h-[76dvh] w-full flex flex-col gap-6 chat-body'>
            {/* Render the chat history dynamically */}
            {chatHistory.map((chat, index) => (
              <ChatMessage key={index} chat={chat} />
            ))}
          </div>

          {/* Chat input */}
          <ChatForm
            question={question}
            chatHistory={chatHistory}
            setquestion={setquestion}
            generateResponse={generateResponse}
            setchatHistory={setchatHistory}
          />
        </div>
      </div>
    </>
  );
}

export default App;