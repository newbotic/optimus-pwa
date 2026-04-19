import { useEffect, useRef } from "react"
import MessageBubble from "./MessageBubble"
import MessageInput from "./MessageInput"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

interface ChatWindowProps {
  messages: Message[]
  onSendMessage: (message: string) => void
  isLoading: boolean
}

export default function ChatWindow({ messages, onSendMessage, isLoading }: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto">
      <header className="glass-effect rounded-2xl m-4 p-4">
        <h1 className="text-2xl font-bold text-primary-500">Optimus</h1>
        <p className="text-sm text-gray-400">Asistentul tau personal AI</p>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-500">
              <p className="text-2xl mb-2">🚀</p>
              <p>Cu ce te pot ajuta astazi?</p>
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))
        )}
        
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="bg-gray-700 text-gray-100 rounded-2xl rounded-tl-sm px-4 py-2">
              <p className="text-sm">Se scrie...</p>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </main>

      <footer className="p-4">
        <MessageInput onSend={onSendMessage} isLoading={isLoading} />
      </footer>
    </div>
  )
}