import { useState, useRef } from 'react'
import { Mic } from 'lucide-react'

interface VoiceInputProps {
  onTranscript: (text: string) => void
  disabled?: boolean
}

export default function VoiceInput({ onTranscript, disabled = false }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false)
  const [interimText, setInterimText] = useState('')
  const recognitionRef = useRef<any>(null)

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    
    if (!SpeechRecognition) {
      alert('Recunoasterea vocala nu este suportata de acest browser.')
      return
    }

    recognitionRef.current = new SpeechRecognition()
    recognitionRef.current.lang = 'ro-RO'
    recognitionRef.current.interimResults = true

    recognitionRef.current.onstart = () => {
      setIsListening(true)
      setInterimText('')
    }
    
    recognitionRef.current.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error)
      setIsListening(false)
    }
    
    recognitionRef.current.onend = () => {
      setIsListening(false)
      setInterimText('')
    }
    
    recognitionRef.current.onresult = (event: any) => {
      let interimTranscript = ''
      let finalTranscript = ''

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          finalTranscript += transcript
        } else {
          interimTranscript += transcript
        }
      }

      setInterimText(interimTranscript)
      
      if (finalTranscript) {
        onTranscript(finalTranscript)
      }
    }

    recognitionRef.current.start()
  }

  return (
    <div className="relative">
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
      
      {isListening && interimText && (
        <div className="absolute bottom-full left-0 mb-2 p-2 bg-gray-800 rounded-lg text-white text-sm whitespace-nowrap">
          {interimText}...
        </div>
      )}
    </div>
  )
}
