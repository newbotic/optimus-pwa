import { useState } from 'react'
import { Volume2 } from 'lucide-react'

interface SpeakButtonProps {
  text: string
}

export default function SpeakButton({ text }: SpeakButtonProps) {
  const [isSpeaking, setIsSpeaking] = useState(false)

  const handleSpeak = () => {
    if (!text) return
    
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'ro-RO'
    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)
    
    window.speechSynthesis.speak(utterance)
  }

  return (
    <button
      type="button"
      onClick={handleSpeak}
      className={`p-1.5 rounded-lg transition-colors ${
        isSpeaking ? 'bg-primary-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
      }`}
      title="Asculta raspunsul"
    >
      <Volume2 size={16} />
    </button>
  )
}
