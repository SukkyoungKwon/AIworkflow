import { useState } from 'react'
import { Sparkles, Info } from 'lucide-react'
import { workflows, type DelegationLevel } from './data/workflows'
import { DelegationDot } from './components/DelegationBadge'
import { StepBadge } from './components/StepBadge'
import { WorkflowDetail } from './components/WorkflowDetail'
import { DelegationGuide } from './components/DelegationGuide'

const LEVEL_ORDER: DelegationLevel[] = ['automate', 'augment', 'amplify', 'human-own']

function uniqueLevels(levels: DelegationLevel[]) {
  return LEVEL_ORDER.filter((l) => levels.includes(l))
}

function App() {
  const [selectedId, setSelectedId] = useState(workflows[0].id)
  const [showGuide, setShowGuide] = useState(false)
  const selected = workflows.find((w) => w.id === selectedId) ?? workflows[0]

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <aside className="w-full border-b border-gray-200 bg-white md:fixed md:inset-y-0 md:left-0 md:z-10 md:flex md:w-64 md:flex-col md:border-b-0 md:border-r">
        <div className="flex items-center gap-2 border-b border-gray-100 px-5 py-5">
          <Sparkles size={20} className="text-[var(--brand)]" />
          <div>
            <h1 className="text-base font-semibold text-gray-900">AI-UX 협업 가이드</h1>
            <p className="text-xs text-gray-500">단계별 AI·사람 역할과 프롬프트</p>
          </div>
        </div>
        <nav className="space-y-1 px-3 py-4 md:flex-1 md:overflow-y-auto">
          {workflows.map((w) => (
            <button
              key={w.id}
              type="button"
              onClick={() => setSelectedId(w.id)}
              className={`w-full text-left rounded-xl border px-3 py-2.5 transition-shadow ${
                w.id === selectedId
                  ? 'border-[var(--brand-border)] bg-[var(--brand-light)] shadow-sm'
                  : 'border-transparent hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <StepBadge order={w.order} isGate={w.kind === 'gate'} size="sm" />
                <span className="text-sm font-medium text-gray-900">{w.name}</span>
              </div>
              <div className="mt-1.5 ml-[38px] flex items-center gap-1">
                {uniqueLevels(w.deliverables.map((d) => d.level)).map((level) => (
                  <DelegationDot key={level} level={level} />
                ))}
              </div>
            </button>
          ))}
        </nav>
      </aside>

      <div className="min-h-screen md:ml-64">
        <div className="mx-auto max-w-5xl px-4 py-6 md:px-16 md:py-12">
          <div className="mb-4 flex justify-end">
            <button
              type="button"
              onClick={() => setShowGuide((v) => !v)}
              className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
            >
              <Info size={13} />
              위임 강도 가이드
            </button>
          </div>

          {showGuide && (
            <div className="mb-6">
              <DelegationGuide />
            </div>
          )}

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-8">
            <WorkflowDetail stage={selected} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
