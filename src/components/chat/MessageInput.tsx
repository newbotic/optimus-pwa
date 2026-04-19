import { useState, type FormEvent } from "react"
import { Send } from "lucide-react"

interface MessageInputProps {
  onSend: (message: string) => void
  isLoading: boolean
}

export default function MessageInput({ onSend, isLoading }: MessageInputProps) {
  const [input, setInput] = useState("")

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isLoading) {
      onSend(input.trim())
      setInput("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="glass-effect rounded-2xl p-3 flex gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Scrie un mesaj..."
        className="flex-1 bg-transparent border-none outline-none text-gray-100 placeholder-gray-500"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={!input.trim() || isLoading}
        className="p-2 rounded-xl bg-primary-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-700 transition-colors"
      >
        <Send size={20} />
      </button>
    </form>
  )
}