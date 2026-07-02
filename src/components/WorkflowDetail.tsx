import { Bot, User, ListChecks } from 'lucide-react'
import type { WorkflowStage } from '../data/workflows'
import { DelegationBadge } from './DelegationBadge'
import { PromptCard } from './PromptCard'

export function WorkflowDetail({ stage }: { stage: WorkflowStage }) {
  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-medium text-gray-400">
          {stage.kind === 'gate' ? 'GATE' : `STEP ${stage.order}`}
        </span>
        <DelegationBadge level={stage.delegation} />
      </div>
      <h1 className="text-2xl font-semibold text-gray-900">{stage.name}</h1>
      <p className="mt-1.5 text-sm text-gray-600">{stage.summary}</p>

      <div className="mt-6 grid sm:grid-cols-2 gap-3">
        <div className="rounded-lg border border-indigo-200 bg-indigo-50/50 p-4">
          <div className="flex items-center gap-1.5 text-indigo-700 text-sm font-semibold">
            <Bot size={15} /> AI가 하는 일
          </div>
          <p className="mt-1.5 text-sm text-gray-700">{stage.aiRole}</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <div className="flex items-center gap-1.5 text-gray-700 text-sm font-semibold">
            <User size={15} /> 사람이 하는 일
          </div>
          <p className="mt-1.5 text-sm text-gray-700">{stage.humanRole}</p>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-2">활용 방법</h2>
        <ol className="space-y-1.5">
          {stage.howTo.map((step, i) => (
            <li key={i} className="flex gap-2 text-sm text-gray-700">
              <span className="shrink-0 text-indigo-600 font-medium">{i + 1}.</span>
              {step}
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-2">프롬프트 예시</h2>
        <div className="space-y-3">
          {stage.prompts.map((p) => (
            <PromptCard key={p.title} prompt={p} />
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-4">
        <ListChecks size={16} className="shrink-0 mt-0.5 text-amber-700" />
        <div>
          <div className="text-sm font-semibold text-amber-800">검토 체크포인트</div>
          <p className="mt-0.5 text-sm text-amber-800/90">{stage.checkpoint}</p>
        </div>
      </div>
    </div>
  )
}
