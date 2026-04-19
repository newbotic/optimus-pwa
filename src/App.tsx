import { useState } from "react"
import ChatWindow from "./components/chat/ChatWindow"

export interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

function App() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    try {
      const response = await fetch(import.meta.env.VITE_N8N_WEBHOOK_URL || "", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: content,
          sessionId: "demo-session"
        })
      })

      if (!response.ok) throw new Error("Network response was not ok")
      
      const data = await response.json()
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response || data.message || data.output || "Nu am primit raspuns.",
        role: "assistant",
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, assistantMessage])
    } catch {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Acesta este un raspuns de test. Conecteaza-ma la n8n pentru raspunsuri reale!",
        role: "assistant",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ChatWindow 
      messages={messages}
      onSendMessage={handleSendMessage}
      isLoading={isLoading}
    />
  )
}

export default App