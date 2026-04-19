import { useState } from "react"
import ChatWindow from "../components/chat/ChatWindow"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

function Chat() {
  const navigate = useNavigate()
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
    <div className="min-h-screen bg-gray-900">
      <button 
        onClick={() => navigate('/')}
        className="fixed top-4 left-4 z-50 glass-effect p-2 rounded-xl text-white hover:bg-gray-700 transition-colors"
      >
        <ArrowLeft size={24} />
      </button>
      <ChatWindow 
        messages={messages}
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
      />
    </div>
  )
}

export default Chat