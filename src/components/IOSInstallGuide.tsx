import { useState, useEffect } from 'react'
import { Share, X } from 'lucide-react'

export default function IOSInstallGuide() {
  const [showGuide, setShowGuide] = useState(false)

  useEffect(() => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
    
    if (isIOS && !isStandalone && !localStorage.getItem('ios-guide-closed')) {
      setShowGuide(true)
    }
  }, [])

  const closeGuide = () => {
    setShowGuide(false)
    localStorage.setItem('ios-guide-closed', 'true')
  }

  if (!showGuide) return null

  return (
    <div className="fixed bottom-20 left-4 right-4 glass-effect rounded-2xl p-4 z-50">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shrink-0">
          <Share size={20} className="text-white" />
        </div>
        <div className="flex-1">
          <p className="font-medium text-white mb-1">Instaleaza Optimus pe iPhone</p>
          <p className="text-sm text-gray-400">
            Apasa butonul Share <span className="inline-block align-middle mx-1">📤</span> si alege "Adauga la ecranul de pornire"
          </p>
        </div>
        <button 
          onClick={closeGuide} 
          className="text-gray-400 hover:text-white shrink-0"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  )
}