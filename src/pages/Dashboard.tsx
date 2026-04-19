import { Calendar, CheckCircle2, Activity, Moon, Zap, ChevronRight, MessageCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import IOSInstallGuide from '../components/IOSInstallGuide'

function Dashboard() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">Optimus</h1>
        <button 
          onClick={() => navigate('/chat')}
          className="glass-effect px-4 py-2 rounded-xl text-white flex items-center gap-2 hover:bg-gray-700 transition-colors"
        >
          <MessageCircle size={18} />
          <span>Chat</span>
          <ChevronRight size={18} />
        </button>
      </div>
      
      {/* Welcome Card */}
      <div className="glass-effect rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Buna dimineata, Vasile! 👋</h2>
            <p className="text-gray-400 flex items-center gap-2">
              <Calendar size={16} />
              Luni, 20 Aprilie 2026
            </p>
          </div>
          <div className="flex gap-4">
            <div className="text-center">
              <Moon size={24} className="text-primary-400 mx-auto mb-1" />
              <span className="text-white font-bold">7.5h</span>
              <p className="text-xs text-gray-400">Somn</p>
            </div>
            <div className="text-center">
              <Zap size={24} className="text-yellow-400 mx-auto mb-1" />
              <span className="text-white font-bold">85%</span>
              <p className="text-xs text-gray-400">Energie</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Grid de carduri */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Card Task-uri */}
        <div className="glass-effect rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <CheckCircle2 size={20} className="text-green-400" />
              Prioritati azi
            </h3>
            <button className="text-primary-400 text-sm hover:text-primary-300">
              + Adauga
            </button>
          </div>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full border-2 border-gray-500" />
              <span className="text-gray-300">Finalizeaza raportul</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full border-2 border-gray-500" />
              <span className="text-gray-300">Sedinta echipa la 11:00</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full border-2 border-gray-500" />
              <span className="text-gray-300">Raspunde la email-uri</span>
            </li>
          </ul>
          <p className="text-sm text-gray-400 mt-4 pt-3 border-t border-gray-700">
            0/3 completate
          </p>
        </div>
        
        {/* Card Fitness */}
        <div className="glass-effect rounded-2xl p-5">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
            <Activity size={20} className="text-orange-400" />
            Fitness
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Pasi</span>
                <span className="text-white">7,234 / 10,000</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '72%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Minute active</span>
                <span className="text-white">45 / 60 min</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Calorii</span>
                <span className="text-white">1,850 / 2,500</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: '74%' }} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Card Calendar */}
        <div className="glass-effect rounded-2xl p-5">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
            <Calendar size={20} className="text-blue-400" />
            Astazi
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-1 h-12 bg-green-500 rounded-full" />
              <div>
                <p className="text-white font-medium">Deep Work</p>
                <p className="text-sm text-gray-400">09:00 - 11:00</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1 h-12 bg-blue-500 rounded-full" />
              <div>
                <p className="text-white font-medium">Sedinta echipa</p>
                <p className="text-sm text-gray-400">11:00 - 12:00</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1 h-12 bg-yellow-500 rounded-full" />
              <div>
                <p className="text-white font-medium">Pranz</p>
                <p className="text-sm text-gray-400">13:00 - 14:00</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Card Insight */}
        <div className="glass-effect rounded-2xl p-5 md:col-span-2 lg:col-span-3">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-3">
            💡 Insight-uri pentru tine
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-800/50 rounded-xl p-4">
              <p className="text-green-400 text-sm mb-1">📈 Productivitate</p>
              <p className="text-gray-300">In zilele cu somn &gt;7h, esti cu 40% mai productiv.</p>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4">
              <p className="text-blue-400 text-sm mb-1">🏃 Fitness</p>
              <p className="text-gray-300">Ai facut sport 3 zile saptamana asta. Continua tot asa!</p>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4">
              <p className="text-yellow-400 text-sm mb-1">⏰ Timp</p>
              <p className="text-gray-300">Cele mai productive ore: 09:00 - 11:00.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* iOS Install Guide */}
      <IOSInstallGuide />
    </div>
  )
}

export default Dashboard