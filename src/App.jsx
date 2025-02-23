import { useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [question, setquestion] = useState("");
  const [answer, setanswer] = useState("");

  const generateResponse = async () => {
    setanswer("Generating response...")
    const response = await axios({
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDVzoFmoJlFIVOUskR6NReHl4D28cjt8SM",
      method: "post",
      data: {
        "contents": [{
          "parts": [{ "text": question }]
        }]
      }
    })

    setanswer(response["data"]["candidates"][0]["content"]["parts"][0]["text"])
  }

  return (
    <>
      <div className='bg-[#181818] flex flex-col gap-2 justify-center items-center h-full'>

        <div className='text-white font-bold text-2xl p-5'>AI-Based Conversational Tool</div>

        <div className='bg-[#1f1f1f] w-[80%] h-full rounded-md flex flex-col gap-2 justify-between items-center p-4 m-4'>

          <div className='text-white'>{answer}</div>

          <div className='flex gap-2 justify-between items-center w-full h-32 py-8'>

            <input className='border-[1px] border-white h-full rounded-[50px] text-white p-2 w-[80%]' value={question} onChange={(e) => setquestion(e.target.value)} placeholder='Ask anything to me'></input>

            <button onClick={generateResponse} className='bg-white py-2 px-5 rounded-2xl font-semibold w-[20%]'>Generate Response</button>

          </div>
        </div>
      </div>
    </>
  )
}

export default App
