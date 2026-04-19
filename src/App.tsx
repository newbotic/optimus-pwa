import { useState } from "react"
import ChatWindow from "./components/chat/ChatWindow"
import InstallPrompt from "./components/InstallPrompt"

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
      const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL
      
      if (!webhookUrl) {
        throw new Error("Webhook URL not configured")
      }

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: content
        })
      })

      if (!response.ok) throw new Error("Network response was not ok")
      
      const data = await response.json()
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data[0]?.output || data.output || "Nu am primit raspuns.",
        role: "assistant",
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Eroare la conectare. Verifica n8n sau incearca mai tarziu.",
        role: "assistant",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <ChatWindow 
        messages={messages}
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
      />
      <InstallPrompt />
    </>
  )
}

export default App
