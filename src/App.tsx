import { useState } from 'react'
import { Sparkles, Info } from 'lucide-react'
import { workflows } from './data/workflows'
import { DelegationBadge } from './components/DelegationBadge'
import { WorkflowDetail } from './components/WorkflowDetail'
import { DelegationGuide } from './components/DelegationGuide'

function App() {
  const [selectedId, setSelectedId] = useState(workflows[0].id)
  const [showGuide, setShowGuide] = useState(false)
  const selected = workflows.find((w) => w.id === selectedId) ?? workflows[0]

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles size={20} className="text-indigo-600" />
            <div>
              <h1 className="text-base font-semibold text-gray-900">AI-UX 협업 가이드</h1>
              <p className="text-xs text-gray-500">단계별 AI·사람 역할과 바로 쓰는 프롬프트</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowGuide((v) => !v)}
            className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
          >
            <Info size={13} />
            위임 강도 가이드
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {showGuide && (
          <div className="mb-8">
            <DelegationGuide />
          </div>
        )}

        <div className="grid md:grid-cols-[240px_1fr] gap-8">
          <nav className="space-y-1">
            {workflows.map((w) => (
              <button
                key={w.id}
                type="button"
                onClick={() => setSelectedId(w.id)}
                className={`w-full text-left rounded-lg px-3 py-2.5 border transition-colors ${
                  w.id === selectedId
                    ? 'border-indigo-300 bg-indigo-50'
                    : 'border-transparent hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium text-gray-900">
                    {w.kind === 'gate' ? 'GATE' : w.order} · {w.name}
                  </span>
                </div>
                <div className="mt-1.5">
                  <DelegationBadge level={w.delegation} />
                </div>
              </button>
            ))}
          </nav>

          <WorkflowDetail stage={selected} />
        </div>
      </main>
    </div>
  )
}

export default App
