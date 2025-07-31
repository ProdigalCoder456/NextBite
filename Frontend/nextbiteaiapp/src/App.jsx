import { useState } from 'react'
import './App.css'
import ChatBot from './Chatbot.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <ChatBot />
      </div>
      
    </>
  )
}

export default App
