import { delegationLevels } from '../data/workflows'
import { DelegationBadge } from './DelegationBadge'

export function DelegationGuide() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-sm font-semibold text-gray-900">위임 강도 4단계</h2>
      <p className="mt-1 text-xs text-gray-500">
        새 작업을 시작하기 전 "이 4개 중 뭐지?"를 먼저 정하면 리뷰 강도와 책임 소재가 자동으로 정해진다.
      </p>
      <div className="mt-4 grid sm:grid-cols-2 gap-3">
        {delegationLevels.map((d) => (
          <div
            key={d.level}
            className="rounded-xl border border-gray-100 p-3.5 transition-shadow hover:shadow-md"
          >
            <DelegationBadge level={d.level} />
            <p className="mt-2 text-sm text-gray-800">{d.definition}</p>
            <p className="mt-1 text-xs text-gray-500">개입 — {d.humanInvolvement}</p>
            <p className="mt-1 text-xs text-gray-400">확인 — {d.checkpoint}</p>
            <p className="mt-1 text-xs text-gray-400">예시 — {d.example}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
