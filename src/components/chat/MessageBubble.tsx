import SpeakButton from './SpeakButton'

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
}

interface MessageBubbleProps {
  message: Message
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user'
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={
          isUser
            ? 'bg-primary-600 text-white rounded-2xl rounded-tr-sm px-4 py-2 max-w-[80%]'
            : 'bg-gray-700 text-gray-100 rounded-2xl rounded-tl-sm px-4 py-2 max-w-[80%]'
        }
      >
        <div className="flex items-start gap-2">
          <p className="whitespace-pre-wrap flex-1">{message.content}</p>
          {!isUser && <SpeakButton text={message.content} />}
        </div>
        <span className="text-xs opacity-70 block mt-1">
          {message.timestamp.toLocaleTimeString('ro-RO', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </span>
      </div>
    </div>
  )
}
