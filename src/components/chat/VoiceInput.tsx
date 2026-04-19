import { useState, useRef } from 'react'
import { Mic } from 'lucide-react'

interface VoiceInputProps {
  onTranscript: (text: string) => void
  disabled?: boolean
}

export default function VoiceInput({ onTranscript, disabled = false }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false)
  const recognitionRef = useRef<any>(null)

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    
    if (!SpeechRecognition) {
      alert('Recunoasterea vocala nu este suportata de acest browser.')
      return
    }

    recognitionRef.current = new SpeechRecognition()
    recognitionRef.current.lang = 'ro-RO'
    recognitionRef.current.interimResults = false

    recognitionRef.current.onstart = () => setIsListening(true)
    recognitionRef.current.onerror = () => setIsListening(false)
    recognitionRef.current.onend = () => setIsListening(false)
    
    recognitionRef.current.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      onTranscript(transcript)
    }

    recognitionRef.current.start()
  }

  return (
    <button
      type="button"
      onClick={startListening}
      disabled={disabled}
      className={`p-2 rounded-xl transition-all ${
        isListening 
          ? 'bg-red-500 text-white animate-pulse' 
          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
      } disabled:opacity-50 disabled:cursor-not-allowed`}
      title="Apasa si vorbeste"
    >
      <Mic size={20} />
    </button>
  )
}
